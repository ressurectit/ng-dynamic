import {MetadataHistoryManager} from '@anglr/dynamic';
import {Selection, BaseType, Line, line, curveBundle} from 'd3';
import {Observable, Subject} from 'rxjs';

import {Coordinates, RelationsInput, RelationsNodeMetadata, RelationsOutput} from '../interfaces';
import {RelationsNodeManager} from '../services';
import {INVALIDATE_DROP} from './constants';

const STROKE_WIDTH = '3px';
const HIGHLIGHT_STROKE_WIDTH = '5px';

/**
 * Class that represents node relation path
 */
export class NodeRelationPath
{
    //######################### protected fields #########################

    /**
     * Subject used for emitting destroying event
     */
    protected destroyingSubject: Subject<void> = new Subject<void>();

    /**
     * Object that represents rendered path
     */
    protected path: Selection<SVGPathElement, {}, null, undefined>;

    /**
     * Line generator for generating lines
     */
    protected lineGenerator: Line<[number, number]>;

    //######################### public properties #########################

    /**
     * Output from which relation start
     */
    public output: RelationsOutput|undefined|null = null;

    /**
     * Input where relation ends
     */
    public input: RelationsInput|undefined|null = null;

    /**
     * Occurs when this relation is being destroyed
     */
    public get destroying(): Observable<void>
    {
        return this.destroyingSubject.asObservable();
    }

    //######################### constructor #########################

    constructor(protected parentGroup: Selection<BaseType, {}, null, undefined>,
                protected relationManager: RelationsNodeManager,
                protected history: MetadataHistoryManager<RelationsNodeMetadata[]>,
                public start: Coordinates|null,
                public end: Coordinates|null)
    {
        this.path = this.parentGroup.append('path')
            .attr('fill', 'transparent')
            .attr('stroke', '#48B8B8')
            .attr('stroke-width', STROKE_WIDTH)
            .on('mouseover', () =>
            {
                this.highlight();
            })
            .on('mouseout', () =>
            {
                this.cancelHighlight();
            });

        this.lineGenerator = line()
            .curve(curveBundle.beta(0.75));
    }

    //######################### public methods #########################

    /**
     * Method used for destroying this relation node
     */
    public destroy(): void
    {
        this.path?.remove();
        this.destroyingSubject.next();
    }

    /**
     * Highlights relation path and its input/output
     */
    public highlight(): void
    {
        this.path.attr('stroke-width', HIGHLIGHT_STROKE_WIDTH);
        this.input?.highlight();
        this.output?.highlight();
    }

    /**
     * Cancel hight for relation path
     */
    public cancelHighlight(): void
    {
        this.path.attr('stroke-width', STROKE_WIDTH);
        this.input?.cancelHighlight();
        this.output?.cancelHighlight();
    }

    /**
     * Explicitly runs invalidation of content (change detection)
     * @param propertyName - Name of property that has changed
     */
    public invalidateVisuals(propertyName?: string): void
    {
        if(propertyName == INVALIDATE_DROP)
        {
            const activeInput = this.relationManager.getActiveInput();
            this.relationManager.setActiveInput(null);

            //drop not on input
            if(!activeInput)
            {
                this.destroy();
                this.start = null;
                this.end = null;
                this.input = null;
                this.output = null;
                this.history.getNewState();
            }
            //drop on input peer
            else
            {
                if (activeInput.addRelation(this))
                {
                    this.end = activeInput.getCoordinates();
                    this.input = activeInput;
                    this.history.getNewState();
                }
                else
                {
                    this.destroy();
                    this.start = null;
                    this.end = null;
                    this.input = null;
                    this.output = null;
                    this.history.getNewState();
                }
            }
        }

        if(!this.start || !this.end)
        {
            return;
        }

        let points: [number,number][];

        //path from right to left
        if(this.end.x <= this.start.x)
        {
            let width = this.start.x - this.end.x;
            const tenth = (this.end.y - this.start.y) / 10;

            if(width < 12)
            {
                width = 12;
            }

            width *= 1.3;

            points =
            [
                [this.start.x, this.start.y],
                [this.start.x + 40, this.start.y],
                [this.start.x + width, this.start.y + tenth],
                [this.end.x - width, this.start.y + (9 * tenth)],
                [this.end.x - 40, this.end.y],
                [this.end.x, this.end.y]
            ];
        }
        //path from left to right
        else
        {
            const width = this.end.x - this.start.x;
            const third = width / 3;

            points =
            [
                [this.start.x, this.start.y],
                [this.start.x + third, this.start.y],
                [this.end.x - third, this.end.y],
                [this.end.x, this.end.y]
            ];
        }

        this.path.attr('d', this.lineGenerator(points));
    }
}