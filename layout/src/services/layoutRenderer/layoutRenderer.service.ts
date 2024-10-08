import {Injectable, Injector, Provider, SimpleChanges, ValueProvider, ViewContainerRef} from '@angular/core';
import {DynamicItemExtensionType, SCOPE_ID, addSimpleChange} from '@anglr/dynamic';
import {Action1, NoopAction} from '@jscrpt/common';

import {LayoutComponent, LayoutComponentMetadata} from '../../interfaces';
import {LayoutRendererItem} from './layoutRenderer.interface';
import {LAYOUT_COMPONENT_CHILD_EXTENSIONS} from '../../misc/tokens';
import {MissingTypeBehavior} from '../../misc/enums';
import {NotFoundLayoutTypeSAComponent} from '../../components';
import {LayoutRendererBase} from './layoutRenderer.base';

/**
 * Service used for handling rendering of layout
 */
@Injectable()
export class LayoutRenderer extends LayoutRendererBase<LayoutRendererItem>
{
    //######################### protected properties #########################

    /**
     * Number of register calls waiting
     */
    protected registeredCalls: number = 0;

    //######################### public methods #########################

    /**
     * @inheritdoc
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

        component.changeDetectorRef.reattach();

        //sync call finished
        syncResolve?.();
        this.registeredCalls--;

        if(this.registeredCalls === 0)
        {
            this.renderingFinishedSubject.next();
        }
    }
}