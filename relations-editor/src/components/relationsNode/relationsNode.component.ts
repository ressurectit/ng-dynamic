import {Component, ChangeDetectionStrategy, HostBinding, HostListener, Input, ViewChildren, QueryList} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Coordinates} from '../../interfaces';
import {RelationNodeOutputSAComponent} from '../relationsNodeOutput/relationsNodeOutput.component';
import {RelationNodeInputSAComponent} from '../relationsNodeInput/relationsNodeInput.component';

//TODO: think of using element instead of binding

/**
 * Component used to display relations node
 */
@Component(
{
    selector: 'relations-node',
    templateUrl: 'relationsNode.component.html',
    styleUrls: ['relationsNode.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationNodeSAComponent
{
    //######################### protected properties #########################

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

    //######################### protected properties - host bindings #########################

    /**
     * Component position left
     */
    @HostBinding('style.left')
    protected get _positionLeft(): string
    {
        return `${this._nodePosition?.x}px`;
    }

    /**
     * Component position right
     */
    @HostBinding('style.top')
    protected get _positionTop(): string
    {
        return `${this._nodePosition?.y}px`;
    }

    //######################### protected properties - view children #########################

    /**
     * Node inputs
     */
    @ViewChildren(RelationNodeInputSAComponent)
    protected _inputs!: QueryList<RelationNodeInputSAComponent>;

    /**
     * Node outputs
     */
    @ViewChildren(RelationNodeOutputSAComponent)
    protected _outputs!: QueryList<RelationNodeOutputSAComponent>;

    //######################### public properties - inputs and outputs #########################
 
    /**
     * Editor zoom level
     */
    @Input()
    public zoomLevel: number = 1;

    //######################### constructor #########################
    constructor()
    {
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

    //######################### private methods #########################

    /**
     * Updates node relations
     */
    private _updateRelations()
    {
        this._inputs.forEach(input => 
        {
            input.updateRelation();
        });

        this._outputs.forEach(output => 
        {
            output.updateRelation();
        });
    }
}