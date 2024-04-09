import {ComponentRef, Directive, EventEmitter, Inject, Input, OnChanges, OnDestroy, Optional, Output, SimpleChanges, ViewContainerRef} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {addSimpleChange, DynamicItemLoader} from '@anglr/dynamic';
import {isPresent, nameof} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {RelationsNode, RelationsNodeMetadata} from '../../interfaces';
import {RELATIONS_NODES_LOADER} from '../../misc/tokens';
import {RelationsNodeDef} from '../../misc/types';
import {RelationsNodeManager} from '../../services';
import {RelationsNodeRendererDirectiveOptions} from './relationsNodeRenderer.options';
import {MissingNodeBehavior} from './relationsNodeRenderer.types';

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
    //######################### protected properties #########################

    /**
     * Destroy subscription
     */
    protected destroySubscription: Subscription|null = null;

    /**
     * Created component reference
     */
    protected componentRef: ComponentRef<TComponent>|null = null;

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
    public destroy: EventEmitter<RelationsNodeMetadata<TOptions, TEditorOptions>> = new EventEmitter<RelationsNodeMetadata<TOptions, TEditorOptions>>();

    //######################### protected properties #########################

    /**
     * Instance of dynamically created component
     */
    protected get component(): TComponent|null
    {
        if(!this.componentRef)
        {
            return null;
        }

        return this.componentRef.instance;
    }

    //######################### constructor #########################
    constructor(protected viewContainerRef: ViewContainerRef,
                protected relationsNodeManager: RelationsNodeManager,
                @Inject(RELATIONS_NODES_LOADER) protected loader: DynamicItemLoader<RelationsNodeDef>,
                @Optional() protected options?: RelationsNodeRendererDirectiveOptions,
                @Inject(LOGGER) @Optional() protected logger?: Logger,)
    {
        if(!this.options || !(this.options instanceof RelationsNodeRendererDirectiveOptions))
        {
            this.options = new RelationsNodeRendererDirectiveOptions();
        }
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

                const chngs: SimpleChanges = {};
                addSimpleChange<RelationsNode>(chngs, 'zoomLevel', zoomChanges, zoomChanges.previousValue);

                component.ngOnChanges(chngs);
                component.invalidateVisuals();
            }

            return;
        }

        this.logger?.debug('RelationsNodeRendererSADirective: rendering node {{@id}}', {id: this.componentMetadata?.id});

        this.ngOnDestroy();
        this.viewContainerRef.clear();

        // component metadata is present
        if(nameof<RelationsNodeRendererSADirective<TComponent, TOptions, TEditorOptions>>('componentMetadata') in changes && this.componentMetadata)
        {
            let layoutComponentType = await this.loader.loadItem(this.componentMetadata);

            if(!layoutComponentType)
            {
                this.logger?.warn('RelationsNodeRendererSADirective: Unable to find relations node type {{@type}}', {type: {name: this.componentMetadata.name, package: this.componentMetadata.package}});

                switch(this.options?.missingNodeBehavior)
                {
                    default:
                    //case MissingNodeBehavior.ShowNotFound:
                    {
                        layoutComponentType = await this.loader.loadItem(
                        {
                            package: 'basic-components',
                            name: 'notFound',
                        });

                        if(!layoutComponentType)
                        {
                            this.logger?.error('RelationsNodeRendererSADirective: Unable to find not found node!');

                            return;
                        }

                        break;
                    }
                    case MissingNodeBehavior.Ignore:
                    {
                        //do nothing
                        return;
                    }
                    case MissingNodeBehavior.ThrowError:
                    {
                        throw new Error(`RelationsNodeRendererSADirective: Unable to find relations node type Name: ${this.componentMetadata.name} Package: ${this.componentMetadata.package}`);
                    }
                }
            }

            this.componentRef = this.viewContainerRef.createComponent(layoutComponentType.data,
                                                                      {
                                                                          injector: this.viewContainerRef.injector,
                                                                      }) as ComponentRef<TComponent>;

            this.logger?.debug('RelationsNodeRendererSADirective: node rendered {{@id}}', {id: this.componentMetadata?.id});

            if(this.component)
            {
                const node = this.component;

                this.destroySubscription = node.destroy.subscribe(() => this.ngOnDestroy());

                this.logger?.debug('RelationsNodeRendererSADirective: initializing node with metadata {{@id}}', {id: this.componentMetadata?.id});
                node.metadata = this.componentMetadata;
                node.zoomLevel = this.zoomLevel;

                const chngs: SimpleChanges = {};

                addSimpleChange<RelationsNode>(chngs, 'metadata', this.componentMetadata, null, true);
                addSimpleChange<RelationsNode>(chngs, 'zoomLevel', this.zoomLevel, null, true);
                
                node.ngOnChanges(chngs);
                await node.initialize();

                this.logger?.debug('RelationsNodeRendererSADirective: invalidating node visuals {{@id}}', {id: this.componentMetadata?.id});
                node.invalidateVisuals();
                this.componentRef.changeDetectorRef.markForCheck();

                this.relationsNodeManager.registerNode(this.component);
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
        this.destroySubscription?.unsubscribe();
        this.destroySubscription = null;

        if(this.componentRef)
        {
            this.logger?.debug('RelationsNodeRendererSADirective: destroying node {{@id}}', {id: this.componentMetadata?.id});
    
            if(this.component)
            {                
                this.relationsNodeManager.unregisterNode(this.component);

                if(this.componentMetadata)
                {
                    this.destroy.next(this.componentMetadata);
                }
            }

            this.componentRef?.destroy();
            this.componentRef = null;
        }
    }
}