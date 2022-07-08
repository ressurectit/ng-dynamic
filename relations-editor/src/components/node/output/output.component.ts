import {Component, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RelationNodePointBase} from '../nodePointBase';
import {NodeRelationPath} from '../../../misc';
import {INVALIDATE_DROP} from '../../../interfaces/node/nodePoint.interface';

/**
 * Component used to display relation node output
 */
@Component(
{
    selector: 'relation-node-output',
    template: '',
    styleUrls: ['output.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationNodeOutputSAComponent extends RelationNodePointBase
{
    //######################### protected properties #########################

    /**
     * Relations
     */
    protected _relations: NodeRelationPath[] = [];

    //######################### protected methods - host listeners #########################

    /**
     * Mouse down event
     * @param event 
     */
    @HostListener('mousedown', ['$event'])
    protected _onMouseDown(event: DragEvent): void
    {
        event.stopImmediatePropagation();
        event.preventDefault();

        this._isDragging = true;
        this._lastMouseDownPosition = {
            x: event.clientX,
            y: event.clientY
        };

        this._relation = this._addOutputRelation();
        this._relations.push(this._relation);
    }

    /**
     * Mouse move event - whole window
     * @param event 
     */
    @HostListener('window:mousemove', ['$event'])
    protected _onMouseMove(event: DragEvent): void
    {
        if (this._isDragging)
        {
            event.stopImmediatePropagation();
            event.preventDefault();

            if (this._relation)
            {
                this._relation.end =
                {
                    x: this.getCoordinates().x + (event.clientX - this._lastMouseDownPosition.x) * 1/this.zoomLevel,
                    y: this.getCoordinates().y + (event.clientY - this._lastMouseDownPosition.y) * 1/this.zoomLevel
                };
    
                this._relation.invalidateVisuals();
            }
        }
    }

    /**
     * Mouse up event - whole window
     * @param event 
     */
    @HostListener('window:mouseup', ['$event'])
    protected _onMouseUp(event: DragEvent): void
    {
        if (this._isDragging)
        {
            this._isDragging = false;
            event.stopImmediatePropagation();
            event.preventDefault();

            this._relation?.invalidateVisuals(INVALIDATE_DROP);
        }
    }

    //######################### protected methods #########################

    /**
     * Adds relation to specified output
     * @returns Returns relation that will start from this output
     */
    protected _addOutputRelation(): NodeRelationPath
    {
        const relation = this._canvas?.createRelation();

        relation.start = this.getCoordinates();
        relation.destroying.subscribe(() => 
        {
            const index = this._relations.indexOf(relation);

            if(index >= 0)
            {
                this._relations.splice(index, 1);
            }
        });

        return relation;
    }

    //######################### public methods #########################

    /**
     * Updates node output relations
     * @returns 
     */
    public updateRelation(): void 
    {
        if (!this._relations)
        {
            return;
        }

        for (const relation of this._relations)
        {
            relation.start = this.getCoordinates();
            relation.invalidateVisuals();
        }
    }
}