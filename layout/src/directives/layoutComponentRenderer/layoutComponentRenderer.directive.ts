import {ComponentRef, Directive, Inject, Injector, Input, OnChanges, OnDestroy, Optional, SimpleChanges, ViewContainerRef} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {LayoutComponent, LayoutComponentMetadata, DynamicItemLoader} from '@anglr/dynamic';
import {nameof} from '@jscrpt/common';

import {LayoutComponentRendererDirectiveOptions} from './layoutComponentRenderer.options';
import {MissingTypeBehavior} from './layoutComponentRenderer.types';
import {NotFoundLayoutTypeSAComponent} from '../../components';

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

    //######################### public properties - inputs #########################

    /**
     * Type that should be dynamically created into current container
     */
    @Input('layoutComponentRenderer')
    public componentMetadata: LayoutComponentMetadata<TComponentOptions>|null = null;

    /**
     * Custom injector used as parent for layout components tree
     */
    @Input('layoutComponentRendererInjector')
    public customInjector?: Injector;

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
        this._viewContainerRef.clear();
        this.ngOnDestroy();

        // component metadata is present
        if(nameof<LayoutComponentRendererSADirective<TComponent, TComponentOptions>>('componentMetadata') in changes &&
           this.componentMetadata)
        {
            const injector = this.customInjector || this._viewContainerRef.injector;
            // const componentManager = injector.get(ComponentManager);
            // const componentRelationsManager = injector.get(ComponentRelationManager);

            // await componentRelationsManager.initialize();

            const layoutComponentType = await this._loader.loadItem(this.componentMetadata);

            if(!layoutComponentType)
            {
                this._logger?.warn('LayoutComponentRendererSADirective: Unable to find layout component type {@type}', {name: this.componentMetadata.name, package: this.componentMetadata.package});

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
                        throw new Error(`LayoutComponentRendererSADirective: Unable to find layout component type Name: ${this.componentMetadata.name} Package: ${this.componentMetadata.package}`);
                    }
                }

                return;
            }

            this._componentRef = this._viewContainerRef.createComponent(layoutComponentType.type,
                                                                        {
                                                                            injector,
                                                                        });
            
            const component = this.component;

            if(component)
            {
                component.options = this.componentMetadata.options;
                component.invalidateVisuals();
                
                // componentManager.registerComponent(this.componentMetadata.id, this.component);
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
        }
    }
}