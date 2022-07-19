import {ComponentRef, Directive, EventEmitter, Inject, Input, OnChanges, OnDestroy, Optional, Output, SimpleChange, SimpleChanges, ViewContainerRef} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemLoader} from '@anglr/dynamic';
import {isPresent, nameof} from '@jscrpt/common';

import {RelationsNode, RelationsNodeMetadata} from '../../interfaces';
import {RELATIONS_NODES_LOADER} from '../../misc/tokens';
import {RelationsNodeDef} from '../../misc/types';

/**
 * Renderer for dynamic relations node
 */
@Directive(
{
    selector: '[relationsNodeRenderer]',
    standalone: true,
    exportAs: 'relationsNodeRenderer'
})
export class RelationsNodeRendererSADirective<TComponent extends RelationsNode = any, TOptions = any, TEditorOptions = any> implements OnChanges, OnDestroy
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
    @Input('relationsNodeRenderer')
    public componentMetadata: RelationsNodeMetadata<TOptions, TEditorOptions>|undefined|null = null;

    /**
     * Editor zoom level
     */
    @Input()
    public zoomLevel: number = 1;

    //######################### public properties - outputs #########################

    /**
     * Occurs when rendered node is created
     */
    @Output()
    public create: EventEmitter<TComponent> = new EventEmitter<TComponent>();

    /**
     * Occurs when rendered node is destroyed
     */
    @Output()
    public destroy: EventEmitter<TComponent> = new EventEmitter<TComponent>();

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
                @Inject(RELATIONS_NODES_LOADER) protected _loader: DynamicItemLoader<RelationsNodeDef>,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of OnChanges #########################

    /**
     * Called when input value changes
     */
    public async ngOnChanges(changes: SimpleChanges): Promise<void>
    {
        //only zoom level changed
        if(nameof<RelationsNodeRendererSADirective<TComponent, TOptions, TEditorOptions>>('zoomLevel') in changes && isPresent(this.zoomLevel) &&
           !(nameof<RelationsNodeRendererSADirective<TComponent, TOptions, TEditorOptions>>('componentMetadata') in changes))
        {
            const component = this.component;

            //component is created
            if(component)
            {
                const zoomChanges = changes[nameof<RelationsNodeRendererSADirective<TComponent, TOptions, TEditorOptions>>('zoomLevel')];

                component.zoomLevel = this.zoomLevel;
                
                const change: SimpleChange =
                {
                    currentValue: zoomChanges.currentValue,
                    firstChange: false,
                    previousValue: zoomChanges.previousValue,
                    isFirstChange: () => false,
                };

                const chngs: SimpleChanges = {};
                chngs[nameof<RelationsNode>('zoomLevel')] = change;

                component.ngOnChanges(chngs);
                component.invalidateVisuals();
            }

            return;
        }

        this._logger?.debug('RelationsNodeRendererSADirective: rendering node {@id}', {id: this.componentMetadata?.id});

        this.ngOnDestroy();
        this._viewContainerRef.clear();

        // component metadata is present
        if(nameof<RelationsNodeRendererSADirective<TComponent, TOptions, TEditorOptions>>('componentMetadata') in changes && this.componentMetadata)
        {
            const layoutComponentType = await this._loader.loadItem(this.componentMetadata);

            if(!layoutComponentType)
            {
                this._logger?.warn('RelationsNodeRendererSADirective: Unable to find relations node type {@type}', {name: this.componentMetadata.name, package: this.componentMetadata.package});

                //TODO: similar handling

                // switch(this._options?.missingTypeBehavior)
                // {
                //     default:
                //     //case MissingTypeBehavior.ShowNotFound:
                //     {
                //         this._viewContainerRef.createComponent(NotFoundLayoutTypeSAComponent);

                //         break;
                //     }
                //     case MissingTypeBehavior.Ignore:
                //     {
                //         //do nothing

                //         break;
                //     }
                //     case MissingTypeBehavior.ThrowError:
                //     {
                //         throw new Error(`RelationsNodeRendererSADirective: Unable to find layout component type Name: ${componentMetadata.name} Package: ${componentMetadata.package}`);
                //     }
                // }

                return;
            }

            this._componentRef = this._viewContainerRef.createComponent(layoutComponentType.data,
                                                                        {
                                                                            injector: this._viewContainerRef.injector,
                                                                        }) as ComponentRef<TComponent>;

            this._logger?.debug('RelationsNodeRendererSADirective: node rendered {@id}', {id: this.componentMetadata?.id});

            if(this.component)
            {
                const node = this.component;

                this._logger?.debug('RelationsNodeRendererSADirective: initializing node with metadata {@id}', {id: this.componentMetadata?.id});
                node.metadata = this.componentMetadata;
                node.zoomLevel = this.zoomLevel;

                const chngs: SimpleChanges = {};
                
                chngs[nameof<RelationsNode>('metadata')] =
                {
                    currentValue: this.componentMetadata,
                    previousValue: null,
                    firstChange: true,
                    isFirstChange: () => true
                };

                chngs[nameof<RelationsNode>('zoomLevel')] =
                {
                    currentValue: this.zoomLevel,
                    previousValue: null,
                    firstChange: true,
                    isFirstChange: () => true
                };

                node.ngOnChanges(chngs);

                this._logger?.debug('RelationsNodeRendererSADirective: invalidating node visuals {@id}', {id: this.componentMetadata?.id});
                node.invalidateVisuals();

                this.create.next(node);
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
            this._logger?.debug('RelationsNodeRendererSADirective: destroying node {@id}', {id: this.componentMetadata?.id});
    
            if(this.component)
            {
                this.destroy.next(this.component);
            }

            this._componentRef?.destroy();
            this._componentRef = null;
        }
    }
}