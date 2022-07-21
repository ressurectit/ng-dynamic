import {ComponentRef, Directive, EventEmitter, Inject, Injector, Input, OnChanges, OnDestroy, Optional, Output, SimpleChanges, SkipSelf, Type, ValueProvider, ViewContainerRef} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemExtension, DynamicItemLoader} from '@anglr/dynamic';
import {nameof, resolvePromiseOr} from '@jscrpt/common';

import {LayoutComponentRendererDirectiveOptions} from './layoutComponentRenderer.options';
import {MissingTypeBehavior} from './layoutComponentRenderer.types';
import {NotFoundLayoutTypeSAComponent} from '../../components';
import {LayoutComponent, LayoutComponentMetadata, LayoutComponentTransform} from '../../interfaces';
import {LAYOUT_COMPONENTS_LOADER, LAYOUT_COMPONENT_CHILD_EXTENSIONS, LAYOUT_COMPONENT_TRANSFORM} from '../../misc/tokens';
import {LayoutComponentDef} from '../../misc/types';

/**
 * Renders layout component from metadata
 */
@Directive(
{
    selector: '[layoutComponentRenderer]',
    exportAs: 'layoutComponentRenderer',
    providers: 
    [
        <ValueProvider>
        {
            provide: LAYOUT_COMPONENT_CHILD_EXTENSIONS,
            useValue: null,
        }
    ],
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

    //######################### public properties #########################

    /**
     * Gets component ref of created component or null
     */
    public get componentRef(): ComponentRef<TComponent>|null
    {
        return this._componentRef;
    }

    //######################### constructor #########################
    constructor(protected _viewContainerRef: ViewContainerRef,
                @Inject(LAYOUT_COMPONENTS_LOADER) protected _loader: DynamicItemLoader<LayoutComponentDef>,
                @Inject(LAYOUT_COMPONENT_CHILD_EXTENSIONS) @Optional() @SkipSelf() protected _childExtensions?: Type<DynamicItemExtension>[]|null,
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
        this._logger?.debug('LayoutComponentRendererSADirective: rendering component {@id}', {id: this.componentMetadata?.id});

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

            const usedInjector = Injector.create(
            {
                parent: injector,
                providers:
                [
                    <ValueProvider>
                    {
                        provide: LAYOUT_COMPONENT_CHILD_EXTENSIONS,
                        useValue: layoutComponentType.childExtensions,
                    }
                ]
            });

            this._componentRef = this._viewContainerRef.createComponent(layoutComponentType.data,
                                                                        {
                                                                            injector: usedInjector,
                                                                        }) as ComponentRef<TComponent>;

            this._logger?.debug('LayoutComponentRendererSADirective: component rendered {@id}', {id: componentMetadata?.id});

            this.componentChange.next(this._componentRef);
            
            if(this.component)
            {
                this.component.registerExtensions(
                [
                    ...this._childExtensions?.map(itm => new itm()) ?? [],
                    ...layoutComponentType?.extensions?.map(itm => new itm()) ?? [],
                ]);

                this._logger?.debug('LayoutComponentRendererSADirective: initializing component with options {@id}', {id: componentMetadata?.id});
                await resolvePromiseOr(this.component.initialize?.(componentMetadata.options));

                this._logger?.debug('LayoutComponentRendererSADirective: invalidating component visuals {@id}', {id: componentMetadata?.id});
                this.component?.invalidateVisuals();
                this._componentRef.changeDetectorRef.markForCheck();
            }
        }
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        if(this._componentRef)
        {
            this._logger?.debug('LayoutComponentRendererSADirective: destroying component {@id}', {id: this.componentMetadata?.id, designer: this.disableTransformer});
    
            this._componentRef?.destroy();
            this._componentRef = null;
            this.componentChange.next(null);
        }
    }
}