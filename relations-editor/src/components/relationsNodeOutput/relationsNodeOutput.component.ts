import {Component, ChangeDetectionStrategy, HostListener, OnDestroy} from '@angular/core';

import {RelationNodeEndpointBase} from '../relationsNodeEndpointBase';
import {RelationsOutput} from '../../interfaces';
import {NodeRelationPath} from '../../misc/nodeRelationPath';
import {INVALIDATE_DROP} from '../../misc/constants';

//TODO: optimize window events, do not register for all time

/**
 * Component used to display relation node output
 */
@Component(
{
    selector: 'relation-node-output',
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationNodeOutputSAComponent extends RelationNodeEndpointBase implements RelationsOutput, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Relations
     */
    protected ɵrelations: NodeRelationPath[] = [];

    //######################### public properties - implementation of RelationsOutput #########################

    /**
     * @inheritdoc
     */
    public get relations(): NodeRelationPath[]
    {
        return this.ɵrelations;
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        if(this.ɵrelations)
        {
            const relations = [...this.ɵrelations];

            for(const relation of relations)
            {
                relation.destroy();
            }
        }

        this.canvasPositionChangeSubscription?.unsubscribe();
        this.canvasPositionChangeSubscription = null;
    }

    //######################### public methods - implementation of RelationsOutput #########################

    /**
     * @inheritdoc
     */
    public startRelation(): NodeRelationPath
    {
        const relation = this.canvas.createRelation();

        relation.start = this.getCoordinates();
        relation.output = this;

        relation.destroying.subscribe(() =>
        {
            const index = this.ɵrelations.indexOf(relation);

            if(index >= 0)
            {
                this.ɵrelations.splice(index, 1);
            }
        });

        this.ɵrelations.push(relation);

        return relation;
    }

    //######################### public methods - overrides #########################

    /**
     * Updates node output relations
     */
    public updateRelation(): void
    {
        if (!this.ɵrelations)
        {
            return;
        }

        for (const relation of this.ɵrelations)
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

        this.isDragging = true;
        this.canvasPositionChangeSubscription = this.canvas?.convasPositionChanged.subscribe(() => 
        {
            if (this.relation)
            {
                this.relation.end = this.canvas.getPositionInCanvas({x: this.lastMouseMovePosition.x, y: this.lastMouseMovePosition.y});
                this.relation.invalidateVisuals();
            }
        });

        this.relation = this.startRelation();
    }

    /**
     * Mouse enter event, marks input as active
     * @param event - Mouse event that occured
     */
    @HostListener('mouseenter', ['$event'])
    protected _onMouseEnter(_: MouseEvent): void
    {
        this.ɵrelations?.forEach(relation => relation?.highlight());
    }

    /**
     * Mouse leave event, clears marked active input
     * @param event - Mouse event that occured
     */
    @HostListener('mouseleave', ['$event'])
    protected _onMouseLeave(_: MouseEvent): void
    {
        this.ɵrelations?.forEach(relation => relation?.cancelHighlight());
    }

    /**
     * Mouse move event - whole window
     * @param event - Mouse event that occured
     */
    @HostListener('window:mousemove', ['$event'])
    protected _onMouseMove(event: DragEvent): void
    {
        if (this.isDragging)
        {
            event.stopImmediatePropagation();
            event.preventDefault();

            this.lastMouseMovePosition =
            {
                x: event.clientX,
                y: event.clientY
            };

            if (this.relation)
            {
                this.relation.end = this.canvas.getPositionInCanvas({x: this.lastMouseMovePosition.x, y: this.lastMouseMovePosition.y});
                this.relation.invalidateVisuals();
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
        if (this.isDragging)
        {
            this.isDragging = false;
            this.canvasPositionChangeSubscription?.unsubscribe();
            this.canvasPositionChangeSubscription = null;
            event.stopImmediatePropagation();
            event.preventDefault();

            this.relation?.invalidateVisuals(INVALIDATE_DROP);
        }
    }
}