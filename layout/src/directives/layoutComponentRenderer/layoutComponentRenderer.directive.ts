import {ComponentRef, Directive, EmbeddedViewRef, EventEmitter, Inject, Injector, Input, OnChanges, OnDestroy, Optional, Output, SimpleChanges, SkipSelf, ValueProvider, ViewContainerRef} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {addSimpleChange, DynamicItemExtensionType, DynamicItemLoader, SCOPE_ID} from '@anglr/dynamic';
import {nameof} from '@jscrpt/common';

import {LayoutComponentRendererDirectiveOptions} from './layoutComponentRenderer.options';
import {MissingTypeBehavior} from './layoutComponentRenderer.types';
import {NotFoundLayoutTypeSAComponent} from '../../components';
import {LayoutComponent, LayoutComponentMetadata, LayoutComponentTransform} from '../../interfaces';
import {LAYOUT_COMPONENTS_LOADER, LAYOUT_COMPONENT_CHILD_EXTENSIONS, LAYOUT_COMPONENT_TRANSFORM} from '../../misc/tokens';
import {LayoutComponentDef} from '../../misc/types';

//TODO: refactor input, output names

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
    //######################### protected properties #########################

    /**
     * Created component reference
     */
    protected ɵComponentRef: ComponentRef<TComponent>|null = null;

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

    /**
     * Occurs when components element changes
     */
    @Output()
    public componentElementChange: EventEmitter<HTMLElement|null> = new EventEmitter<HTMLElement|null>();

    //######################### protected properties #########################

    /**
     * Instance of dynamically created component
     */
    protected get component(): TComponent|null
    {
        if(!this.ɵComponentRef)
        {
            return null;
        }

        return this.ɵComponentRef.instance;
    }

    //######################### public properties #########################

    /**
     * Gets component ref of created component or null
     */
    public get componentRef(): ComponentRef<TComponent>|null
    {
        return this.ɵComponentRef;
    }

    //######################### constructor #########################
    constructor(protected viewContainerRef: ViewContainerRef,
                @Inject(LAYOUT_COMPONENTS_LOADER) protected loader: DynamicItemLoader<LayoutComponentDef>,
                @Inject(LAYOUT_COMPONENT_CHILD_EXTENSIONS) @Optional() @SkipSelf() protected childExtensions?: DynamicItemExtensionType[]|null,
                @Inject(SCOPE_ID) @Optional() protected scopeId?: string,
                @Optional() protected options?: LayoutComponentRendererDirectiveOptions,
                @Inject(LAYOUT_COMPONENT_TRANSFORM) @Optional() protected metadataTransformer?: LayoutComponentTransform,
                @Inject(LOGGER) @Optional() protected logger?: Logger,)
    {
        if(!this.options || !(this.options instanceof LayoutComponentRendererDirectiveOptions))
        {
            this.options = new LayoutComponentRendererDirectiveOptions();
        }
    }

    //######################### public methods - implementation of OnChanges #########################

    /**
     * Called when input value changes
     */
    public async ngOnChanges(changes: SimpleChanges): Promise<void>
    {
        this.logger?.debug('LayoutComponentRendererSADirective: rendering component {{@id}}', {id: this.componentMetadata?.id});

        this.ngOnDestroy();
        this.viewContainerRef.clear();

        // component metadata is present
        if(nameof<LayoutComponentRendererSADirective<TComponent, TComponentOptions>>('componentMetadata') in changes && this.componentMetadata)
        {
            const injector = this.customInjector ?? this.viewContainerRef.injector;
            let componentMetadata = this.componentMetadata;
            const scopeId = this.componentMetadata.scope;

            if(this.metadataTransformer && !this.disableTransformer)
            {
                componentMetadata = this.metadataTransformer(this.componentMetadata, injector);
            }
            
            const layoutComponentType = await this.loader.loadItem(componentMetadata);

            if(!layoutComponentType)
            {
                this.logger?.warn('LayoutComponentRendererSADirective: Unable to find layout component type {{@type}}', {type: {name: componentMetadata.name, package: componentMetadata.package}});

                switch(this.options?.missingTypeBehavior)
                {
                    default:
                    //case MissingTypeBehavior.ShowNotFound:
                    {
                        this.viewContainerRef.createComponent(NotFoundLayoutTypeSAComponent);

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
                        provide: SCOPE_ID,
                        useValue: scopeId ?? this.scopeId ?? null,
                    },
                    <ValueProvider>
                    {
                        provide: LAYOUT_COMPONENT_CHILD_EXTENSIONS,
                        useValue: layoutComponentType.childExtensions,
                    }
                ]
            });

            this.ɵComponentRef = this.viewContainerRef.createComponent(layoutComponentType.data,
                                                                       {
                                                                           injector: usedInjector,
                                                                       }) as ComponentRef<TComponent>;

            this.logger?.debug('LayoutComponentRendererSADirective: component rendered {{@id}}', {id: componentMetadata?.id});
            const component = this.component;

            if(component)
            {
                //registers extensions and child extensions
                component.registerExtensions(
                [
                    ...this.childExtensions?.map(itm => new itm(componentMetadata)) ?? [],
                    ...layoutComponentType?.extensions?.map(itm => new itm(componentMetadata)) ?? [],
                ]);

                const changes: SimpleChanges = {};
                addSimpleChange<LayoutComponent>(changes, 'options', componentMetadata.options, component.options, true);

                this.logger?.debug('LayoutComponentRendererSADirective: setting options for component {{@id}}', {id: componentMetadata?.id});
                component.options = componentMetadata.options;
                
                this.logger?.debug('LayoutComponentRendererSADirective: setting changes for component {{@id}}', {id: componentMetadata?.id});
                await component.ngOnChanges?.(changes);

                this.logger?.debug('LayoutComponentRendererSADirective: initializing component {{@id}}', {id: componentMetadata?.id});
                await component.ngOnInit?.();

                this.logger?.debug('LayoutComponentRendererSADirective: invalidating component visuals {{@id}}', {id: componentMetadata?.id});
                component.invalidateVisuals();
                this.ɵComponentRef?.changeDetectorRef.markForCheck();

                this.componentElementChange.next((this.ɵComponentRef?.hostView as EmbeddedViewRef<unknown>)?.rootNodes?.[0] as HTMLElement);
                this.componentChange.next(this.ɵComponentRef);
            }
        }
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        if(this.ɵComponentRef)
        {
            this.logger?.debug('LayoutComponentRendererSADirective: destroying component {{@id}}', {id: this.componentMetadata?.id, designer: this.disableTransformer});
    
            this.ɵComponentRef?.destroy();
            this.ɵComponentRef = null;
            this.componentChange.next(null);
            this.componentElementChange.next(null);
        }
    }
}