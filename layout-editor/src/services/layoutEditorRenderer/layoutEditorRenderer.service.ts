import {Injectable, Injector, SimpleChanges, ValueProvider, ViewContainerRef} from '@angular/core';
import {DynamicItemExtensionType, SCOPE_ID, addSimpleChange} from '@anglr/dynamic';
import {LAYOUT_COMPONENT_CHILD_EXTENSIONS, LayoutComponent, LayoutComponentMetadata, LayoutRendererBase, MissingTypeBehavior, NotFoundLayoutTypeSAComponent} from '@anglr/dynamic/layout';
import {Action1, NoopAction} from '@jscrpt/common';

import {LayoutEditorRendererItem} from './layoutEditorRenderer.interface';
import {LAYOUT_DESIGNER_COMPONENT_ID_SUFFIX} from '../../misc/constants';
import {LayoutDesignerComponentOptions} from '../../components';

/**
 * Service used for handling rendering of layout
 */
@Injectable()
export class LayoutEditorRenderer extends LayoutRendererBase<LayoutEditorRendererItem>
{
    //######################### protected properties #########################

    /**
     * Instance of promise that is used for sync async/await calls
     */
    protected syncPromise: Promise<void> = Promise.resolve();

    /**
     * Number of register calls waiting
     */
    protected registeredCalls: number = 0;

    //######################### public methods #########################

    /**
     * Gets renderer information for component
     * @param id - Id of component that should be obtained
     */
    public get(id: string): LayoutEditorRendererItem|undefined|null
    {
        return this.components[id];
    }

    /**
     * @inheritdoc
     */
    public override async registerRenderer(id: string,
                                           parentId: string|undefined|null,
                                           viewContainer: ViewContainerRef,
                                           metadata: LayoutComponentMetadata,
                                           parentMetadata: LayoutComponentMetadata|undefined|null,
                                           scopeId: string|undefined|null,
                                           childExtensions: DynamicItemExtensionType[]|undefined|null,
                                           renderedCallback: Action1<LayoutEditorRendererItem>|undefined|null,
                                           customInjector: Injector|undefined|null,): Promise<void>
    {
        this.registeredCalls++;

        //synchronization code
        const syncPromise = this.syncPromise;
        let syncResolve: NoopAction|undefined;
        this.syncPromise = new Promise(resolve => syncResolve = resolve);
        await syncPromise;

        this.logger.debug('LayoutEditorRenderer: registering renderer {{@(4)renderer}}', {renderer: {id, parentId, metadata, parentMetadata, scopeId}});

        let isDesigner: boolean = false;
        let rendererItem: LayoutEditorRendererItem;
        const componentItem = this.components[metadata.id];
        const layoutDesignerId = `${metadata.id}${LAYOUT_DESIGNER_COMPONENT_ID_SUFFIX}`;

        //component does not exists nor its designer, so create designer
        if(!componentItem)
        {
            isDesigner = true;

            rendererItem =
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
                layoutDesigner: null,
                componentViewContainer: null,
                componentRendererId: null,
            };

            //register self as child of its parent
            if(parentId)
            {
                this.renderers[parentId]?.childrenIds.push(id);
            }

            this.components[metadata.id] = rendererItem;
            this.renderers[id] = rendererItem;
        }
        //component is rendered inside its layout designer
        else if(componentItem && componentItem.id == parentId && !componentItem.component && !componentItem.componentViewContainer)
        {
            rendererItem = componentItem;
            rendererItem.componentViewContainer = viewContainer;
            rendererItem.componentRendererId = id;

            this.renderers[id] = rendererItem;
        }
        else
        {
            throw new Error(`LayoutEditorRenderer: component with ID ${metadata.id} already exists!`);
        }

        this.logger.verbose('LayoutEditorRenderer: getting type "{{@id}}" isDesigner: {{isDesigner}} for {{@dynamicItem}}', {id: metadata?.id, isDesigner, dynamicItem: {package: metadata.package, name: metadata.name}});

        const injector = customInjector ?? viewContainer.injector;
        const componentScopeId = metadata.scope;
        const layoutComponentType = await this.loader.loadItem(
            isDesigner
                ? {
                    id: layoutDesignerId,
                    package: '@anglr/dynamic/layout-editor',
                    name: 'layout-designer',
                    options: <LayoutDesignerComponentOptions>
                    {
                        typeMetadata: metadata
                    }
                }
                : metadata,);

        this.logger.verbose('LayoutEditorRenderer: rendering component {{@id}} isDesigner: {{isDesigner}}', {id: metadata?.id, isDesigner});

        if(!layoutComponentType)
        {
            this.logger.warn('LayoutEditorRenderer: Unable to find layout component type {{@type}} isDesigner: {{isDesigner}}', {type: {name: metadata.name, package: metadata.package}, isDesigner});

            switch(this.options.missingTypeBehavior)
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
                    throw new Error(`LayoutEditorRenderer: Unable to find layout component type Name: ${metadata.name} Package: ${metadata.package}`);
                }
            }

            return;
        }

        this.logger.verbose('LayoutEditorRenderer: rendering component {{@id}} isDesigner: {{isDesigner}}', {id: metadata?.id, isDesigner});

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

        if(isDesigner)
        {
            rendererItem.layoutDesigner = component;
        }
        else
        {
            rendererItem.component = component;
        }

        component.changeDetectorRef.detach();

        this.logger.verbose('LayoutEditorRenderer: component rendered {{@id}} isDesigner: {{isDesigner}}', {id: metadata?.id, isDesigner});

        const instance = component.instance;

        //registers extensions and child extensions
        instance.registerExtensions(
        [
            ...childExtensions?.map(itm => new itm(metadata)) ?? [],
            ...layoutComponentType?.extensions?.map(itm => new itm(metadata)) ?? [],
        ]);

        const options = isDesigner
            ? <LayoutDesignerComponentOptions>
            {
                typeMetadata: metadata
            }
            : metadata.options;

        const changes: SimpleChanges = {};
        addSimpleChange<LayoutComponent>(changes, 'options', options, instance.options, true);

        this.logger.verbose('LayoutEditorRenderer: setting options for component {{id}}, isDesigner: {{isDesigner}}, options: {{@(4)options}}', {id: metadata?.id, options: options, isDesigner});
        instance.options = options;
        this.logger.verbose('LayoutEditorRenderer: set options for component {{id}} isDesigner: {{isDesigner}}', {id: metadata?.id, isDesigner});

        this.logger.verbose('LayoutEditorRenderer: setting changes for component {{id}} isDesigner: {{isDesigner}}', {id: metadata?.id, isDesigner});
        await instance.ngOnChanges?.(changes);
        this.logger.verbose('LayoutEditorRenderer: set changes for component {{id}} isDesigner: {{isDesigner}}', {id: metadata?.id, isDesigner});

        this.logger.verbose('LayoutEditorRenderer: initializing component {{id}} isDesigner: {{isDesigner}}', {id: metadata?.id, isDesigner});
        await instance.ngOnInit?.();
        this.logger.verbose('LayoutEditorRenderer: initialized component {{id}} isDesigner: {{isDesigner}}', {id: metadata?.id, isDesigner});

        this.logger.verbose('LayoutEditorRenderer: invalidating component visuals {{id}} isDesigner: {{isDesigner}}', {id: metadata?.id, isDesigner});
        instance.invalidateVisuals();
        this.logger.verbose('LayoutEditorRenderer: invalidated component visuals {{id}} isDesigner: {{isDesigner}}', {id: metadata?.id, isDesigner});

        this.logger.verbose('LayoutEditorRenderer: after view initializing {{id}} isDesigner: {{isDesigner}}', {id: metadata?.id, isDesigner});
        await instance.ngAfterViewInit?.();
        this.logger.verbose('LayoutEditorRenderer: after view initialized {{id}} isDesigner: {{isDesigner}}', {id: metadata?.id, isDesigner});

        if(!isDesigner)
        {
            renderedCallback?.(rendererItem);
        }

        //sync call finished
        syncResolve?.();
        this.registeredCalls--;

        if(this.registeredCalls === 0)
        {
            this.renderingFinishedSubject.next();
        }
    }

    /**
     * Destroyes renderer, removes it from register, destroyed renderer also destroys component, this is called when renderer is destroyed
     * @param id - Id of renderer
     */
    public override destroyRenderer(id: string): void
    {
        //TODO: fix this
        this.logger.debug('LayoutEditorRenderer: destroying renderer "{{id}}", current renderers register: {{@(4)renderers}}', {id, renderers: Object.keys(this.renderers)});

        this.unregisterFromParent(id);
        const renderer = this.renderers[id];

        //if renderer exists remove it from register
        if(renderer)
        {
            this.logger.verbose('LayoutEditorRenderer: removing renderer from registry "{{id}}"', {id});

            delete this.components[renderer.metadata.id];
            delete this.renderers[id];
        }
    }

    /**
     * Unregisters renderer, removes it from register, destroys component, this is called when renderer is emptied
     * @param id - Id of renderer that will be removed
     */
    public override unregisterRenderer(id: string): void
    {
        //TODO: fix this
        this.logger.debug('LayoutEditorRenderer: ungregistering renderer "{{id}}", current renderers register: {{@(4)renderers}}', {id, renderers: Object.keys(this.renderers)});

        this.unregisterFromParent(id);
        const renderer = this.renderers[id];

        //if renderer exists remove it from register and destroy component
        if(renderer)
        {
            this.logger.verbose('LayoutEditorRenderer: destroying component "{{id}}"', {id});
            //destroys component
            renderer.viewContainer.clear();
            this.logger.verbose('LayoutEditorRenderer: component destroyed "{{id}}"', {id});

            delete this.components[renderer.metadata.id];
            delete this.renderers[id];
        }
    }

    //######################### protected methods #########################

    /**
     * Unregisters renderer from its parent
     * @param id - Id of renderer which is going to be unregistered
     */
    protected unregisterFromParent(id: string): void
    {
        this.logger.debug('LayoutEditorRenderer: ungregistering renderer from its parent "{{id}}"', {id});

        const renderer = this.renderers[id];

        //if renderer exists remove it from parent
        if(renderer)
        {
            //not root renderer
            if(renderer.parentId)
            {
                const parentRenderer = this.renderers[renderer.parentId];

                this.logger.verbose('LayoutEditorRenderer: removing "{{id}}" fromits parent {{parentId}}', {id, parentId: renderer.parentId});

                //unregister child from parent
                if(parentRenderer)
                {
                    //its not component renderer do nothing
                    if(parentRenderer.id != renderer.componentRendererId)
                    {
                        this.logger.verbose('LayoutEditorRenderer: it is layout component renderer "{{id}}"', {id});

                        return;
                    }

                    const index = parentRenderer.childrenIds.indexOf(id);

                    if(index >= 0)
                    {
                        this.logger.verbose('LayoutEditorRenderer: removing from parent renderer "{{id}}"', {id});

                        parentRenderer.childrenIds.splice(index, 1);
                    }
                }
            }
        }
    }
}