import {ComponentRef, inject, Injectable, Injector, Provider, SimpleChanges, Type, ValueProvider, ViewContainerRef} from '@angular/core';
import {DynamicItemExtensionType, DynamicItemLoader, SCOPE_ID, addSimpleChange} from '@anglr/dynamic';
import {Logger, LOGGER} from '@anglr/common';
import {Action1, NoopAction, PromiseOr} from '@jscrpt/common';
import {Observable, Subject} from 'rxjs';

import {LayoutComponent, LayoutComponentMetadata} from '../../interfaces';
import {LayoutRendererItem} from './layoutRenderer.interface';
import {LAYOUT_COMPONENT_CHILD_EXTENSIONS, LAYOUT_COMPONENTS_LOADER} from '../../misc/tokens';
import {MissingTypeBehavior} from '../../misc/enums';
import {NotFoundLayoutTypeSAComponent} from '../../components';
import {LayoutComponentDef} from '../../misc/types';
import {LayoutRendererOptions} from './layoutRenderer.options';

/**
 * Service used for handling rendering of layout
 */
@Injectable()
export class LayoutRenderer
{
    //######################### protected properties #########################

    /**
     * Instance of promise that is used for sync async/await calls
     */
    protected syncPromise: Promise<void> = Promise.resolve();

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
     * Subject used for emitting when rendering has finished
     */
    protected renderingFinishedSubject: Subject<void> = new Subject<void>();

    /**
     * Map of renderers and their data
     */
    protected renderers: Record<string, LayoutRendererItem|undefined|null> = {};

    /**
     * Map of renderers and their data using rendered component id
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

    /**
     * Number of register calls waiting
     */
    protected registeredCalls: number = 0;

    //######################### public properties #########################

    /**
     * Occurs when rendering has finished
     */
    public get renderingFinished(): Observable<void>
    {
        return this.renderingFinishedSubject.asObservable();
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
     * Registers renderer and renders its component
     * @param id - Unique id of renderer
     * @param parentId - Unique id of parents renderer or undefined|null if root renderer
     * @param viewContainer - View container attached to renderer used for rendering component
     * @param metadata - Metadata of rendered component
     * @param parentMetadata - Metadata of parent of rendere component
     * @param scopeId - Id of scope in which is this component rendered
     * @param childExtensions - Array of child extensions applied to component
     * @param renderedCallback - Callback called when registered component is fully rendered
     * @param extraProviders - Array of extra providers to be provided
     */
    public async registerRenderer(id: string,
                                  parentId: string|undefined|null,
                                  viewContainer: ViewContainerRef,
                                  metadata: LayoutComponentMetadata,
                                  parentMetadata: LayoutComponentMetadata|undefined|null,
                                  scopeId: string|undefined|null,
                                  childExtensions: DynamicItemExtensionType[]|undefined|null,
                                  renderedCallback: Action1<LayoutRendererItem>|undefined|null,
                                  extraProviders: Provider[]|undefined|null,): Promise<void>
    {
        this.registeredCalls++;

        //synchronization code
        const syncPromise = this.syncPromise;
        let syncResolve: NoopAction|undefined;
        this.syncPromise = new Promise(resolve => syncResolve = resolve);
        await syncPromise;

        this.logger.debug('LayoutRenderer: registering renderer {{@(4)renderer}}', {renderer: {id, parentId, metadata, parentMetadata, scopeId}});
        
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
            component: null,
            additionalData: null,
        };

        this.components[metadata.id] = rendererItem;
        this.renderers[id] = rendererItem;

        const injector = viewContainer.injector;
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
                    viewContainer.createComponent(NotFoundLayoutTypeSAComponent);

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
                },
                ...extraProviders ?? [],
            ]
        });

        this.updateTypeBeforeRender(layoutComponentType.data);

        const component = viewContainer.createComponent(layoutComponentType.data,
                                                        {
                                                            injector: usedInjector,
                                                        });

        this.updateTypeAfterRender(layoutComponentType.data);

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

        this.logger.verbose('LayoutRenderer: setting options for component {{id}}, options: {{@(4)options}}', {id: metadata?.id, options: metadata.options});
        instance.options = metadata.options;
        this.logger.verbose('LayoutRenderer: set options for component {{id}}', {id: metadata?.id});

        this.logger.verbose('LayoutRenderer: setting changes for component {{id}}', {id: metadata?.id});
        await instance.dynamicOnChanges?.(changes);
        this.logger.verbose('LayoutRenderer: set changes for component {{id}}', {id: metadata?.id});

        this.logger.verbose('LayoutRenderer: initializing component {{id}}', {id: metadata?.id});
        await instance.dynamicOnInit?.();
        this.logger.verbose('LayoutRenderer: initialized component {{id}}', {id: metadata?.id});

        this.logger.verbose('LayoutRenderer: invalidating component visuals {{id}}', {id: metadata?.id});
        instance.invalidateVisuals();
        this.logger.verbose('LayoutRenderer: invalidated component visuals {{id}}', {id: metadata?.id});

        this.logger.verbose('LayoutRenderer: after view initializing {{id}}', {id: metadata?.id});
        await instance.dynamicAfterViewInit?.();
        this.logger.verbose('LayoutRenderer: after view initialized {{id}}', {id: metadata?.id});

        renderedCallback?.(rendererItem);
        await this.postProcessCreatedComponent(component, metadata);

        component.changeDetectorRef.reattach();

        //sync call finished
        syncResolve?.();
        this.registeredCalls--;

        if(this.registeredCalls === 0)
        {
            this.renderingFinishedSubject.next();
        }
    }

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

    /**
     * Destroyes renderer, removes it from register, destroyed renderer also destroys component, this is called when renderer is destroyed
     * @param id - Id of renderer
     */
    public async destroyRenderer(id: string): Promise<void>
    {
        //synchronization code
        const syncPromise = this.syncPromise;
        let syncResolve: NoopAction|undefined;
        this.syncPromise = new Promise(resolve => syncResolve = resolve);
        await syncPromise;

        this.logger.debug('LayoutRenderer: destroying renderer "{{id}}"', {id});

        const renderer = this.renderers[id];
        
        //if renderer exists remove it from register
        if(renderer)
        {
            this.logger.verbose('LayoutRenderer: removing renderer from registry "{{id}}"', {id});

            delete this.components[renderer.metadata.id];
            delete this.renderers[id];
        }

        //sync call finished
        syncResolve?.();
    }
    
    /**
     * Unregisters renderer, removes it from register, destroys component, this is called when renderer is emptied
     * @param id - Id of renderer that will be removed
     */
    public async unregisterRenderer(id: string): Promise<void>
    {
        //synchronization code
        const syncPromise = this.syncPromise;
        let syncResolve: NoopAction|undefined;
        this.syncPromise = new Promise(resolve => syncResolve = resolve);
        await syncPromise;

        this.logger.debug('LayoutRenderer: ungregistering renderer "{{id}}"', {id});

        const renderer = this.renderers[id];

        //if renderer exists remove it from register and destroy component
        if(renderer)
        {
            this.logger.verbose('LayoutRenderer: destroying component "{{id}}"', {id});
            //destroys component
            renderer.viewContainer.clear();
            this.logger.verbose('LayoutRenderer: component destroyed "{{id}}"', {id});

            delete this.components[renderer.metadata.id];
            delete this.renderers[id];
        }

        //sync call finished
        syncResolve?.();
    }

    //######################### protected methods #########################

    /**
     * Updates rendered type before its renders
     * @param type - Type to be updated
     */
    protected updateTypeBeforeRender(_type: Type<LayoutComponent>): void
    {
    }

    /**
     * Updates rendered type after its renders
     * @param type - Type to be updated
     */
    protected updateTypeAfterRender(_type: Type<LayoutComponent>): void
    {
    }

    /**
     * Called after dynamic component has been rendered and there is postprocessing of data
     * @param component - Component reference to be processed
     * @param metadata - Metadata of rendered component
     */
    protected postProcessCreatedComponent(_component: ComponentRef<LayoutComponent>, _metadata: LayoutComponentMetadata): PromiseOr<void>
    {
    }
}