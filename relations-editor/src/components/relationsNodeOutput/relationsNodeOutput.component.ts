import {Component, ChangeDetectionStrategy, HostListener, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RelationNodeEndpointBase} from '../relationsNodeEndpointBase';
import {RelationsOutput} from '../../interfaces';
import {NodeRelationPath} from '../../misc/nodeRelationPath';
import {INVALIDATE_DROP} from '../../misc/constants';

/**
 * Component used to display relation node output
 */
@Component(
{
    selector: 'relation-node-output',
    template: '',
    styleUrls: ['relationsNodeOutput.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationNodeOutputSAComponent extends RelationNodeEndpointBase implements RelationsOutput, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Relations
     */
    protected _relations: NodeRelationPath[] = [];

    //######################### public properties - implementation of RelationsOutput #########################

    /**
     * @inheritdoc
     */
    public get relations(): NodeRelationPath[]
    {
        return this._relations;
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        if(this._relations)
        {
            const relations = [...this._relations];

            for(const relation of relations)
            {
                relation.destroy();
            }
        }
    }

    //######################### public methods - implementation of RelationsOutput #########################

    /**
     * @inheritdoc
     */
    public startRelation(): NodeRelationPath
    {
        const relation = this._canvas.createRelation();

        relation.start = this.getCoordinates();
        relation.output = this;

        relation.destroying.subscribe(() =>
        {
            const index = this._relations.indexOf(relation);

            if(index >= 0)
            {
                this._relations.splice(index, 1);
            }
        });

        this._relations.push(relation);

        return relation;
    }

    //######################### public methods - overrides #########################

    /**
     * Updates node output relations
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

    //######################### protected methods - host listeners #########################

    /**
     * Mouse down event, creates new relation
     * @param event - Mouse event that occured
     */
    @HostListener('mousedown', ['$event'])
    protected _onMouseDown(event: DragEvent): void
    {
        event.stopImmediatePropagation();
        event.preventDefault();

        this._isDragging = true;
        this._lastMouseDownPosition =
        {
            x: event.clientX,
            y: event.clientY
        };

        this._relation = this.startRelation();
    }

    /**
     * Mouse enter event, marks input as active
     * @param event - Mouse event that occured
     */
    @HostListener('mouseenter', ['$event'])
    protected _onMouseEnter(_: MouseEvent): void
    {
        this._relations?.forEach(relation => relation?.highlight());
    }

    /**
     * Mouse leave event, clears marked active input
     * @param event - Mouse event that occured
     */
    @HostListener('mouseleave', ['$event'])
    protected _onMouseLeave(_: MouseEvent): void
    {
        this._relations?.forEach(relation => relation?.cancelHighlight());
    }

    /**
     * Mouse move event - whole window
     * @param event - Mouse event that occured
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
     * @param event - Mouse event that occured
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
}