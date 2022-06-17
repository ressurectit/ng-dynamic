import {ComponentRef, Directive, EventEmitter, Inject, Injector, Input, OnChanges, OnDestroy, Optional, Output, SimpleChanges, ViewContainerRef} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemLoader} from '@anglr/dynamic';
import {nameof} from '@jscrpt/common';

import {LayoutComponentRendererDirectiveOptions} from './layoutComponentRenderer.options';
import {MissingTypeBehavior} from './layoutComponentRenderer.types';
import {NotFoundLayoutTypeSAComponent} from '../../components';
import {LayoutComponent, LayoutComponentMetadata, LayoutComponentTransform} from '../../interfaces';
import {LAYOUT_COMPONENT_TRANSFORM} from '../../misc/tokens';

/**
 * Renders layout component from metadata
 */
@Directive(
{
    selector: '[layoutComponentRenderer]',
    exportAs: 'layoutComponentRenderer',
    standalone: true
})
export class LayoutComponentRendererSADirective<TComponent extends LayoutComponent<TComponentOptions> = any, TComponentOptions = any> implements OnChanges, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Created component reference
     */
    protected _componentRef: ComponentRef<TComponent>|null = null;

    /**
     * Metadata of already rendered component
     */
    protected _renderedComponentMetadata: LayoutComponentMetadata<TComponentOptions>|undefined|null = null;

    //######################### public properties - inputs #########################

    /**
     * Type that should be dynamically created into current container
     */
    @Input('layoutComponentRenderer')
    public componentMetadata: LayoutComponentMetadata<TComponentOptions>|undefined|null = null;

    /**
     * Custom injector used as parent for layout components tree
     */
    @Input('layoutComponentRendererInjector')
    public customInjector: Injector|undefined|null;

    /**
     * Disables component metadata transformer
     */
    @Input('layoutComponentRendererDisableTransformer')
    public disableTransformer: boolean = false;

    //######################### public properties - outputs #########################

    /**
     * Occurs when rendered component changes
     */
    @Output('layoutComponentRendererComponentChange')
    public componentChange: EventEmitter<ComponentRef<TComponent>|null> = new EventEmitter<ComponentRef<TComponent>|null>();

    //######################### protected properties #########################

    /**
     * Instance of dynamically created component
     */
    protected get component(): TComponent|null
    {
        if(!this._componentRef)
        {
            return null;
        }

        return this._componentRef.instance;
    }

    //######################### constructor #########################
    constructor(protected _viewContainerRef: ViewContainerRef,
                protected _loader: DynamicItemLoader,
                @Optional() protected _options?: LayoutComponentRendererDirectiveOptions,
                @Inject(LAYOUT_COMPONENT_TRANSFORM) @Optional() protected _metadataTransformer?: LayoutComponentTransform,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
        if(!this._options || !(this._options instanceof LayoutComponentRendererDirectiveOptions))
        {
            this._options = new LayoutComponentRendererDirectiveOptions();
        }
    }

    //######################### public methods - implementation of OnChanges #########################

    /**
     * Called when input value changes
     */
    public async ngOnChanges(changes: SimpleChanges): Promise<void>
    {
        // remove rendered component if component metadata has changed
        if(this._renderedComponentMetadata?.id !== this.componentMetadata?.id ||
           this._renderedComponentMetadata?.package !== this.componentMetadata?.package ||
           this._renderedComponentMetadata?.name !== this.componentMetadata?.name)
        {
            this.ngOnDestroy();
            this._viewContainerRef.clear();

            // component metadata is present
            if(nameof<LayoutComponentRendererSADirective<TComponent, TComponentOptions>>('componentMetadata') in changes && this.componentMetadata)
            {
                const injector = this.customInjector || this._viewContainerRef.injector;
                let componentMetadata = this.componentMetadata;

                if(this._metadataTransformer && !this.disableTransformer)
                {
                    componentMetadata = this._metadataTransformer(this.componentMetadata, injector);
                }
                // const componentManager = injector.get(ComponentManager);
                // const componentRelationsManager = injector.get(ComponentRelationManager);

                // await componentRelationsManager.initialize();
                const layoutComponentType = await this._loader.loadItem(componentMetadata);

                if(!layoutComponentType)
                {
                    this._logger?.warn('LayoutComponentRendererSADirective: Unable to find layout component type {@type}', {name: componentMetadata.name, package: componentMetadata.package});

                    switch(this._options?.missingTypeBehavior)
                    {
                        default:
                        //case MissingTypeBehavior.ShowNotFound:
                        {
                            this._viewContainerRef.createComponent(NotFoundLayoutTypeSAComponent);

                            break;
                        }
                        case MissingTypeBehavior.Ignore:
                        {
                            //do nothing

                            break;
                        }
                        case MissingTypeBehavior.ThrowError:
                        {
                            throw new Error(`LayoutComponentRendererSADirective: Unable to find layout component type Name: ${componentMetadata.name} Package: ${componentMetadata.package}`);
                        }
                    }

                    return;
                }

                this._componentRef = this._viewContainerRef.createComponent(layoutComponentType.type,
                                                                            {
                                                                                injector,
                                                                            });

                this.componentChange.next(this._componentRef);
                this._renderedComponentMetadata = this.componentMetadata;
                this._updatedOptions(componentMetadata);
            }
            //only update options
            else
            {
                this._updatedOptions(this.componentMetadata);
            }
        }
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        if(this.componentMetadata && this.component)
        {
            // const injector = this.customInjector || this._viewContainerRef.injector;
            // const componentManager = injector.get(ComponentManager);

            // if(componentManager.get(this.componentMetadata.id))
            // {
            //     componentManager.unregisterComponent(this.componentMetadata.id);
            // }
            
            this._componentRef?.destroy();
            this._componentRef = null;
            this._renderedComponentMetadata = null;
            this.componentChange.next(null);
        }
    }

    //######################### protected methods #########################

    /**
     * Updates options of rendered component
     * @param componentMetadata - Component metadata containing options
     */
    protected _updatedOptions(componentMetadata: LayoutComponentMetadata<TComponentOptions>|undefined|null): void
    {
        const component = this.component;

        if(component && componentMetadata)
        {
            component.options = componentMetadata.options;
            component.invalidateVisuals();
            
            // componentManager.registerComponent(this.componentMetadata.id, this.component);
        }
    }
}