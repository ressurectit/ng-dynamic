import {Component, ChangeDetectionStrategy, HostListener, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RelationNodeEndpointBase} from '../relationsNodeEndpointBase';
import {RelationsInput} from '../../interfaces';
import {NodeRelationPath} from '../../misc/nodeRelationPath';
import {MouseButton} from '../../misc/enums';
import {INVALIDATE_DROP} from '../../misc/constants';

/**
 * Component used to display relation node input
 */
@Component(
{
    selector: 'relation-node-input',
    template: '',
    standalone: true,
    imports:
    [
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationNodeInputSAComponent extends RelationNodeEndpointBase implements RelationsInput, OnDestroy
{
    //######################### private properties #########################

    /**
     * Temporary relation path when updating existing relation
     */
    private _tempRelation: NodeRelationPath|null|undefined;

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        if(this._relation)
        {
            this._relation.destroy();
        }
    }

    //######################### public methods - implementation of RelationsInput #########################

    /**
     * @inheritdoc
     */
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

    /**
     * @inheritdoc
     */
    public endRelation(relation: NodeRelationPath): void
    {
        if(this.addRelation(relation))
        {
            this.updateRelation();
        }
    }

    //######################### public methods - overrides #########################

    /**
     * Updates node output relation
     */
    public updateRelation(): void
    {
        if (!this._relation)
        {
            return;
        }

        this._relation.end = this.getCoordinates();
        this._relation.input = this;
        this._relation.invalidateVisuals();
    }

    //######################### protected methods - host listeners #########################

    /**
     * Mouse enter event, marks input as active
     * @param event - Mouse event that occured
     */
    @HostListener('mouseenter', ['$event'])
    protected _onMouseEnter(event: MouseEvent): void
    {
        if (event.buttons === MouseButton.LEFT)
        {
            this._relationManager.setActiveInput(this);
        }

        this._relation?.highlight();
    }

    /**
     * Mouse leave event, clears marked active input
     * @param event - Mouse event that occured
     */
    @HostListener('mouseleave', ['$event'])
    protected _onMouseLeave(event: MouseEvent): void
    {
        if (event.buttons === MouseButton.LEFT)
        {
            this._relationManager.setActiveInput(null);
        }

        this._relation?.cancelHighlight();
    }

    /**
     * Mouse down event, starts dragging
     * @param event - Mouse event that occured
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
     * @param event - Mouse event that occured
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
     * @param event - Mouse event that occured
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
}