import {Injectable, Injector, SimpleChanges, ValueProvider, ViewContainerRef, inject} from '@angular/core';
import {LOGGER, Logger} from '@anglr/common';
import {DynamicItemExtensionType, DynamicItemLoader, SCOPE_ID, addSimpleChange} from '@anglr/dynamic';
import {WithSync} from '@jscrpt/common';

import {LayoutComponent, LayoutComponentMetadata} from '../../interfaces';
import {LayoutRendererItem} from './layoutRenderer.interface';
import {LAYOUT_COMPONENTS_LOADER, LAYOUT_COMPONENT_CHILD_EXTENSIONS} from '../../misc/tokens';
import {LayoutComponentDef} from '../../misc/types';
import {LayoutRendererOptions} from './layoutRenderer.options';
import {MissingTypeBehavior} from '../../misc/enums';
import {NotFoundLayoutTypeSAComponent} from '../../components';

/**
 * Service used for handling rendering of layout
 */
@Injectable()
export class LayoutRenderer
{
    //######################### protected properties #########################

    /**
     * Instance of logger used for creating logs
     */
    protected logger: Logger = inject(LOGGER);

    /**
     * Instance of loader used for loading components metadata
     */
    protected loader: DynamicItemLoader<LayoutComponentDef> = inject(LAYOUT_COMPONENTS_LOADER);

    /**
     * Options for layout renderer
     */
    protected options: LayoutRendererOptions;

    /**
     * Map of renderers and their data
     */
    protected renderers: Record<string, LayoutRendererItem|undefined|null> = {};

    /**
     * Map of renderers and their data using rendered compmonent id
     */
    protected components: Record<string, LayoutRendererItem|undefined|null> = {};

    /**
     * Gets root renderer
     */
    protected get rootRenderer(): LayoutRendererItem|undefined|null
    {
        const renderers = Object.keys(this.renderers);

        for(const rendererId of renderers)
        {
            const renderer = this.renderers[rendererId];

            if(renderer?.parentId)
            {
                return this.renderers[renderer.parentId];
            }
        }
        
        return null;
    }

    //######################### constructor #########################
    constructor()
    {
        const globalOptions = inject(LayoutRendererOptions, {optional: true});

        if(!globalOptions || !(globalOptions instanceof LayoutRendererOptions))
        {
            this.options = new LayoutRendererOptions();
        }
        else
        {
            this.options = globalOptions;
        }
    }

    //######################### public methods #########################

    /**
     * Tests whether is component with id registered and rendered
     * @param id - Id of component to be tested
     */
    public hasComponent(id: string): boolean
    {
        return !!this.components[id];
    }

    /**
     * Tests whether is renderer with id registered
     * @param id - Id of renderer
     */
    public hasRenderer(id: string): boolean
    {
        return !!this.renderers[id];
    }

    @WithSync()
    public async registerRenderer(id: string,
                                  parentId: string|undefined|null,
                                  viewContainer: ViewContainerRef,
                                  metadata: LayoutComponentMetadata,
                                  parentMetadata: LayoutComponentMetadata|undefined|null,
                                  scopeId: string|undefined|null,
                                  childExtensions: DynamicItemExtensionType[]|undefined|null,
                                  customInjector: Injector|undefined|null,): Promise<void>
    {
        this.logger.debug('LayoutRenderer: registering renderer {{@renderer}}', {renderer: {id, parentId, metadata, parentMetadata, scopeId}});

        //tests whether component already exists
        if(this.components[metadata.id])
        {
            throw new Error(`LayoutRenderer: component with ID ${metadata.id} already exists!`);
        }

        const rendererItem: LayoutRendererItem =
        {
            id,
            parentId,
            viewContainer,
            metadata,
            parentMetadata,
            scopeId,
            childExtensions,
            childrenIds: [],
            component: null,
        };

        this.components[metadata.id] = rendererItem;
        this.renderers[id] = rendererItem;

        const injector = customInjector ?? viewContainer.injector;
        const componentScopeId = metadata.scope;
        const layoutComponentType = await this.loader.loadItem(metadata);

        if(!layoutComponentType)
        {
            this.logger.warn('LayoutRenderer: Unable to find layout component type {{@type}}', {type: {name: metadata.name, package: metadata.package}});

            switch(this.options?.missingTypeBehavior)
            {
                default:
                //case MissingTypeBehavior.ShowNotFound:
                {
                    rendererItem.viewContainer.createComponent(NotFoundLayoutTypeSAComponent);

                    break;
                }
                case MissingTypeBehavior.Ignore:
                {
                    //do nothing

                    break;
                }
                case MissingTypeBehavior.ThrowError:
                {
                    throw new Error(`LayoutRenderer: Unable to find layout component type Name: ${metadata.name} Package: ${metadata.package}`);
                }
            }

            return;
        }

        const usedInjector = Injector.create(
        {
            parent: injector,
            providers:
            [
                <ValueProvider>
                {
                    provide: SCOPE_ID,
                    useValue: componentScopeId ?? scopeId ?? null,
                },
                <ValueProvider>
                {
                    provide: LAYOUT_COMPONENT_CHILD_EXTENSIONS,
                    useValue: layoutComponentType.childExtensions,
                }
            ]
        });

        const component = viewContainer.createComponent(layoutComponentType.data,
                                                           {
                                                               injector: usedInjector,
                                                           });
        rendererItem.component = component;
        component.changeDetectorRef.detach();

        this.logger.verbose('LayoutRenderer: component rendered {{@id}}', {id: metadata?.id});

        const instance = component.instance;

        //registers extensions and child extensions
        instance.registerExtensions(
        [
            ...childExtensions?.map(itm => new itm(metadata)) ?? [],
            ...layoutComponentType?.extensions?.map(itm => new itm(metadata)) ?? [],
        ]);

        const changes: SimpleChanges = {};
        addSimpleChange<LayoutComponent>(changes, 'options', metadata.options, instance.options, true);

        this.logger.verbose('LayoutRenderer: setting options for component {{id}}, options: {{@options}}', {id: metadata?.id, options: metadata.options});
        instance.options = metadata.options;
        this.logger.verbose('LayoutRenderer: set options for component {{id}}', {id: metadata?.id});

        this.logger.verbose('LayoutRenderer: setting changes for component {{id}}', {id: metadata?.id});
        await instance.ngOnChanges?.(changes);
        this.logger.verbose('LayoutRenderer: set changes for component {{id}}', {id: metadata?.id});

        this.logger.verbose('LayoutRenderer: initializing component {{id}}', {id: metadata?.id});
        await instance.ngOnInit?.();
        this.logger.verbose('LayoutRenderer: initialized component {{id}}', {id: metadata?.id});

        this.logger.verbose('LayoutRenderer: invalidating component visuals {{id}}', {id: metadata?.id});
        instance.invalidateVisuals();
        this.logger.verbose('LayoutRenderer: invalidated component visuals {{id}}', {id: metadata?.id});
    }

    /**
     * Destroyes renderer, removes it from register, destroyed renderer also destroys component
     * @param id - Id of renderer
     */
    public destroyRenderer(id: string): void
    {
        this.logger.debug('LayoutRenderer: destroying renderer "{{id}}"', {id});

        const renderer = this.renderers[id];
        
        //if renderer exists remove it from register
        if(renderer)
        {
            this.logger.verbose('LayoutRenderer: removing renderer from registry "{{id}}"', {id});

            delete this.components[renderer.metadata.id];
            delete this.renderers[id];
        }
    }

    /**
     * Unregisters and removes/destroys component from register and html
     * @param id - Id of component that will be removed from renderer
     */
    public unregisterComponent(id: string): void
    {
        this.logger.debug('LayoutRenderer: ungregistering component "{{id}}"', {id});

        const component = this.components[id];

        if(component)
        {
            this.logger.verbose('LayoutRenderer: destroying component "{{id}}"', {id});
            //destroys component
            component.viewContainer.clear();
            this.logger.verbose('LayoutRenderer: component destroyed "{{id}}"', {id});

            //clearing component
            component.component = null;
        }
    }
}