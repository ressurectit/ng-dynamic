import {Component, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RelationNodePointBase} from '../nodePointBase';
import {INVALIDATE_DROP, MouseButton, NodeRelationPath} from '../../../misc';

/**
 * Component used to display relation node input
 */
@Component(
{
    selector: 'relation-node-input',
    template: '',
    styleUrls: ['input.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationNodeInputSAComponent extends RelationNodePointBase
{
    //######################### private properties #########################

    /**
     * Temporary relation path when updating existing relation
     */
    private _tempRelation: NodeRelationPath|null|undefined;

    //######################### public methods #########################

    public addRelation(relation: NodeRelationPath): boolean
    {
        if (this._relation)
        {
            //Same relation
            if (this._relation.start?.x === relation.start?.x &&
                this._relation.start?.y === relation.start?.y)
            {
                return false;
            }

            this._relation.destroy();
        }

        this._relation = relation;
        return true;
    }

    //######################### protected methods - host listeners #########################

    /**
     * Mouse enter event
     * @param event 
     */
    @HostListener('mouseenter', ['$event'])
    //@ts-ignore
    private _onMouseEnter(event: MouseEvent)
    {
        if (event.buttons === MouseButton.LEFT)
        {
            this._relationManager.setActiveInput(this);
        }
    }

    /**
     * Mouse leave event
     * @param event 
     */
    @HostListener('mouseleave', ['$event'])
    //@ts-ignore
    private _onMouseLeave(event: MouseEvent)
    {
        if (event.buttons === MouseButton.LEFT)
        {
            this._relationManager.setActiveInput(null);
        }
    }

    /**
     * Mouse down event
     * @param event 
     */
    @HostListener('mousedown', ['$event'])
    protected _onMouseDown(event: MouseEvent): void
    {
        event.stopImmediatePropagation();
        event.preventDefault();

        this._lastMouseDownPosition = 
        {
            x: event.clientX,
            y: event.clientY
        };

        this._tempRelation = this._relation;
        this._relation = null;
        this._isDragging = true;
    }

    /**
     * Mouse move event on whole window
     * @param event 
     */
    @HostListener('window:mousemove', ['$event'])
    protected _onMouseMove(event: MouseEvent): void
    {
        if (this._isDragging)
        {
            event.stopImmediatePropagation();
            event.preventDefault();

            if (this._tempRelation)
            {
                this._tempRelation.end =
                {
                    x: this.getCoordinates().x + (event.clientX - this._lastMouseDownPosition?.x) * 1/this.zoomLevel,
                    y: this.getCoordinates().y + (event.clientY - this._lastMouseDownPosition?.y) * 1/this.zoomLevel
                };
    
                this._tempRelation.invalidateVisuals();
            }
        }
    }

    /**
     * Mouse up event on whole window
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
            this._tempRelation?.invalidateVisuals(INVALIDATE_DROP);
        }
    }

    //######################### public methods #########################

    /**
     * Updates node output relation
     * @returns 
     */
    public updateRelation(): void 
    {
        if (!this._relation)
        {
            return;
        }

        this._relation.end = this.getCoordinates();
        this._relation.invalidateVisuals();
    }
}