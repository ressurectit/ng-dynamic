import {HostListener, ViewChildren, QueryList, ChangeDetectorRef, ElementRef, SimpleChanges, Directive, OnDestroy, inject} from '@angular/core';
import {MetadataHistoryManager} from '@anglr/dynamic';
import {Dictionary, nameof} from '@jscrpt/common';
import {Observable, Subject} from 'rxjs';

import {Coordinates, RelationsInput, RelationsNode, RelationsNodeMetadata, RelationsOutput} from '../interfaces';
import {RelationNodeOutputSAComponent} from './relationsNodeOutput/relationsNodeOutput.component';
import {RelationNodeInputSAComponent} from './relationsNodeInput/relationsNodeInput.component';
import {RELATIONS_HISTORY_MANAGER} from '../misc/tokens';

/**
 * Base class for relations node components
 */
@Directive()
export abstract class RelationsNodeBase<TOptions = any, TEditorOptions = any> implements RelationsNode<TOptions, TEditorOptions>, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Instance of resize observer
     */
    protected observer: ResizeObserver;

    /**
     * Metadata history manager
     */
    protected history: MetadataHistoryManager<RelationsNodeMetadata[]> = inject(RELATIONS_HISTORY_MANAGER);

    /**
     * Indication whether is node initialized
     */
    protected initialized: boolean = false;

    /**
     * Indication whether user is dragging
     */
    protected isDragging: boolean = false;

    /**
     * Last mouse down position
     */
    protected lastMouseDownPosition: Coordinates =
    {
        x: 0,
        y: 0
    };

    /**
     * Node position on last mouse down event
     */
    protected lastMouseDownNodePosition: Coordinates =
    {
        x: 0,
        y: 0
    };

    /**
     * Node position
     */
    protected nodePosition: Coordinates =
    {
        x: 0,
        y: 0,
    };

    /**
     * Array of all available outputs
     */
    protected ɵAllOutputs: readonly RelationsOutput[] = [];

    /**
     * Object storing inputs by their names
     */
    protected ɵInputs: Dictionary<RelationsInput> = {};
 
    /**
     * Object storing outputs by their names
     */
    protected ɵOutputs: Dictionary<RelationsOutput> = {};

    /**
     * Subject used for destroying node by user
     */
    protected destroySubject: Subject<void> = new Subject<void>();

    //######################### protected properties - view children #########################

    /**
     * Relations node inputs
     */
    @ViewChildren(RelationNodeInputSAComponent)
    protected inputsChildren!: QueryList<RelationsInput>;

    /**
     * Relations node outputs
     */
    @ViewChildren(RelationNodeOutputSAComponent)
    protected outputsChildren!: QueryList<RelationsOutput>;

    //######################### public properties - implementation of RelationsNode #########################

    /**
     * @inheritdoc
     */
    public zoomLevel: number = 1;

    /**
     * @inheritdoc
     */
    public get id(): string
    {
        return this.metadata?.id ?? '';
    }

    /**
     * @inheritdoc
     */
    public metadata: RelationsNodeMetadata<TOptions, TEditorOptions>|undefined|null;

    /**
     * @inheritdoc
     */
    public get allOutputs(): readonly RelationsOutput[]
    {
        return this.ɵAllOutputs;
    }

    /**
     * @inheritdoc
     */
    public get inputs(): Dictionary<RelationsInput>
    {
        return this.ɵInputs;
    }

    /**
     * @inheritdoc
     */
    public get outputs(): Dictionary<RelationsOutput>
    {
        return this.ɵOutputs;
    }

    /**
     * @inheritdoc
     */
    public get destroy(): Observable<void>
    {
        return this.destroySubject.asObservable();
    }

    //######################### constructor #########################
    constructor(protected changeDetector: ChangeDetectorRef,
                protected element: ElementRef<HTMLElement>,)
    {
        this.element.nativeElement.classList.add('relations-node');

        this.updatePosition();

        this.observer = new ResizeObserver(() =>this.updateRelations());
        this.observer.observe(this.element.nativeElement);
    }

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * Called when input value changes
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        //initial change of metadata
        if(nameof<RelationsNodeBase>('metadata') in changes && this.metadata)
        {
            if(this.metadata.nodeMetadata?.coordinates)
            {
                this.nodePosition = this.metadata.nodeMetadata.coordinates;
                this.updatePosition();
            }

            this.metadataSet();
        }
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.observer?.disconnect();
    }

    //######################### public methods - implementation of RelationsNode #########################

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
        this.changeDetector.detectChanges();

        if(!this.initialized)
        {
            this.initialized = true;

            this.initEndpoints();
        }
    }

    /**
     * @inheritdoc
     */
    public initialize(): void
    {
    }

    //######################### protected methods methods - host listeners #########################

    /**
     * Mouse down event
     * @param event
     */
    @HostListener('mousedown', ['$event'])
    protected onMouseDown(event: MouseEvent): void
    {
        this.isDragging = true;
        this.lastMouseDownPosition =
        {
            x: event.clientX,
            y: event.clientY
        };

        this.lastMouseDownNodePosition =
        {
            x: this.nodePosition.x,
            y: this.nodePosition.y
        };

        event.stopImmediatePropagation();
    }

    /**
     * Mouse move event
     * @param event
     */
    @HostListener('window:mousemove', ['$event'])
    protected onMouseMove(event: MouseEvent): void
    {
        if (this.isDragging)
        {
            this.nodePosition =
            {
                x: this.lastMouseDownNodePosition.x + (event.clientX - this.lastMouseDownPosition.x) * 1/this.zoomLevel,
                y: this.lastMouseDownNodePosition.y + (event.clientY - this.lastMouseDownPosition.y) * 1/this.zoomLevel,
            };

            this.updatePosition();

            event.stopImmediatePropagation();
            event.preventDefault();
            this.updateRelations();
        }
    }

    /**
     * Mouse up event
     * @param event
     */
    @HostListener('window:mouseup', ['$event'])
    protected onMouseUp(event: MouseEvent): void
    {
        if (this.isDragging)
        {
            this.history.getNewState();
            this.isDragging = false;
            event.stopImmediatePropagation();
            event.preventDefault();
        }
    }

    //######################### protected methods #########################

    /**
     * Initialize endpoints
     */
    protected initEndpoints(): void
    {
        const updateInputs = () =>
        {
            this.ɵInputs = {};

            this.inputsChildren?.forEach(input =>
            {
                if(input.name)
                {
                    this.ɵInputs[input.name] = input;
                }
            });

            Object.freeze(this.ɵInputs);
        };

        const updateOutputs = () =>
        {
            this.ɵAllOutputs = this.outputsChildren.toArray();
            this.ɵOutputs = {};

            this.outputsChildren?.forEach(output =>
            {
                if(output.name)
                {
                    this.ɵOutputs[output.name] = output;
                }
            });

            Object.freeze(this.ɵOutputs);
        };

        this.inputsChildren?.changes.subscribe(() => updateInputs());
        this.outputsChildren?.changes.subscribe(() => updateOutputs());

        updateInputs();
        updateOutputs();
    }

    /**
     * Updates node relations
     */
    protected updateRelations(): void
    {
        this.inputsChildren.forEach(input =>
        {
            input.updateRelation();
        });

        this.outputsChildren.forEach(output =>
        {
            output.updateRelation();
        });
    }

    /**
     * Updates node position
     */
    protected updatePosition(): void
    {
        this.element.nativeElement.style.left = `${this.nodePosition.x}px`;
        this.element.nativeElement.style.top = `${this.nodePosition.y}px`;

        if(this.metadata?.nodeMetadata?.coordinates)
        {
            this.metadata.nodeMetadata.coordinates.x = this.nodePosition.x;
            this.metadata.nodeMetadata.coordinates.y = this.nodePosition.y;
        }
    }

    /**
     * Allows code to be called after metadata were set
     */
    protected metadataSet(): void
    {
    }
}