import {HostListener, ViewChildren, QueryList, ChangeDetectorRef, ElementRef, SimpleChanges, Directive} from '@angular/core';
import {Dictionary, nameof} from '@jscrpt/common';

import {Coordinates, RelationsInput, RelationsNode, RelationsNodeMetadata, RelationsOutput} from '../interfaces';
import {RelationNodeOutputSAComponent} from './relationsNodeOutput/relationsNodeOutput.component';
import {RelationNodeInputSAComponent} from './relationsNodeInput/relationsNodeInput.component';

/**
 * Base class for relations node components
 */
@Directive()
export abstract class RelationsNodeBase<TOptions = any, TEditorOptions = any> implements RelationsNode<TOptions, TEditorOptions>
{
    //######################### protected fields #########################

    /**
     * Indication whether user is dragging
     */
    protected _isDragging: boolean = false;

    /**
     * Last mouse down position
     */
    protected _lastMouseDownPosition: Coordinates =
    {
        x: 0,
        y: 0
    };

    /**
     * Node position on last mouse down event
     */
    protected _lastMouseDownNodePosition: Coordinates =
    {
        x: 0,
        y: 0
    };

    /**
     * Node position
     */
    protected _nodePosition: Coordinates =
    {
        x: 0,
        y: 0,
    };

    /**
     * Array of all available outputs
     */
    protected _allOutputs: readonly RelationsOutput[] = [];

    /**
     * Object storing inputs by their names
     */
    protected _inputs: Dictionary<RelationsInput> = {};
 
    /**
     * Object storing outputs by their names
     */
    protected _outputs: Dictionary<RelationsOutput> = {};

    //######################### protected properties - view children #########################

    /**
     * Relations node inputs
     */
    @ViewChildren(RelationNodeInputSAComponent)
    protected _inputsChildren!: QueryList<RelationsInput>;

    /**
     * Relations node outputs
     */
    @ViewChildren(RelationNodeOutputSAComponent)
    protected _outputsChildren!: QueryList<RelationsOutput>;

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
        return this._allOutputs;
    }

    /**
     * @inheritdoc
     */
    public get inputs(): Dictionary<RelationsInput>
    {
        return this._inputs;
    }

    /**
     * @inheritdoc
     */
    public get outputs(): Dictionary<RelationsOutput>
    {
        return this._outputs;
    }

    //######################### constructor #########################
    constructor(protected _changeDetector: ChangeDetectorRef,
                protected _element: ElementRef<HTMLElement>,)
    {
        this._updatePosition();
    }

    //######################### public methods - implementation of AfterViewInit #########################
    
    /**
     * Called when view was initialized
     */
    public ngAfterViewInit(): void
    {
        const updateInputs = () =>
        {
            this._inputs = {};

            this._inputsChildren.forEach(input =>
            {
                if(input.name)
                {
                    this._inputs[input.name] = input;
                }
            });

            Object.freeze(this._inputs);
        };

        const updateOutputs = () =>
        {
            this._allOutputs = this._outputsChildren.toArray();
            this._outputs = {};

            this._outputsChildren.forEach(output =>
            {
                if(output.name)
                {
                    this._outputs[output.name] = output;
                }
            });

            Object.freeze(this._outputs);
        };

        this._inputsChildren.changes.subscribe(() => updateInputs());
        this._outputsChildren.changes.subscribe(() => updateOutputs());

        updateInputs();
        updateOutputs();
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
                this._nodePosition = this.metadata.nodeMetadata.coordinates;
                this._updatePosition();
            }

            this.metadataSet();
        }
    }

    //######################### public methods - implementation of RelationsNode #########################

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }

    //######################### protected methods methods - host listeners #########################

    /**
     * Mouse down event
     * @param event
     */
    @HostListener('mousedown', ['$event'])
    protected _onMouseDown(event: MouseEvent): void
    {
        this._isDragging = true;
        this._lastMouseDownPosition =
        {
            x: event.clientX,
            y: event.clientY
        };

        this._lastMouseDownNodePosition =
        {
            x: this._nodePosition.x,
            y: this._nodePosition.y
        };

        event.stopImmediatePropagation();
    }

    /**
     * Mouse move event
     * @param event
     */
    @HostListener('window:mousemove', ['$event'])
    protected _onMouseMove(event: MouseEvent): void
    {
        if (this._isDragging)
        {
            this._nodePosition =
            {
                x: this._lastMouseDownNodePosition.x + (event.clientX - this._lastMouseDownPosition.x) * 1/this.zoomLevel,
                y: this._lastMouseDownNodePosition.y + (event.clientY - this._lastMouseDownPosition.y) * 1/this.zoomLevel,
            };

            this._updatePosition();

            event.stopImmediatePropagation();
            event.preventDefault();
            this._updateRelations();
        }
    }

    /**
     * Mouse up event
     * @param event
     */
    @HostListener('window:mouseup', ['$event'])
    protected _onMouseUp(event: MouseEvent): void
    {
        if (this._isDragging)
        {
            this._isDragging = false;
            event.stopImmediatePropagation();
            event.preventDefault();
        }
    }

    //######################### protected methods #########################

    /**
     * Updates node relations
     */
    protected _updateRelations(): void
    {
        this._inputsChildren.forEach(input =>
        {
            input.updateRelation();
        });

        this._outputsChildren.forEach(output =>
        {
            output.updateRelation();
        });
    }

    /**
     * Updates node position
     */
    protected _updatePosition(): void
    {
        this._element.nativeElement.style.left = `${this._nodePosition?.x}px`;
        this._element.nativeElement.style.top = `${this._nodePosition?.y}px`;
    }

    /**
     * Allows code to be called after metadata were set
     */
    protected abstract metadataSet(): void;
}