import {Selection, BaseType, Line, line, curveBundle} from 'd3';
import {Observable, Subject} from 'rxjs';

import {Coordinates} from '../interfaces';
import {RelationManager} from '../services';
import {INVALIDATE_DROP} from './constants';

/**
 * Class that represents node relation path
 */
export class NodeRelationPath
{
    //######################### protected fields #########################

    /**
     * Subject used for emitting destroying event
     */
    protected _destroyingSubject: Subject<void> = new Subject<void>();

    /**
     * Object that represents rendered path
     */
    protected _path: Selection<SVGPathElement, {}, null, undefined>;

    /**
     * Line generator for generating lines
     */
    protected _lineGenerator: Line<[number, number]>;

    //######################### public properties #########################

    /**
     * Occurs when this relation is being destroyed
     */
    public get destroying(): Observable<void>
    {
        return this._destroyingSubject.asObservable();
    }

    //######################### constructor #########################

    constructor(protected _parentGroup: Selection<BaseType, {}, null, undefined>,
                protected _relationManager: RelationManager,
                public start: Coordinates|null,
                public end: Coordinates|null)
    {
        this._path = this._parentGroup.append('path')
            .attr('fill', 'transparent')
            .attr('stroke', '#48B8B8')
            .attr('stroke-width', '3px');

        this._lineGenerator = line()
            .curve(curveBundle.beta(0.75));
    }

    //######################### public methods #########################

    /**
     * Method used for destroying this relation node
     */
    public destroy(): void
    {
        this._path?.remove();
        this._destroyingSubject.next();
    }

    /**
     * Explicitly runs invalidation of content (change detection)
     * @param propertyName - Name of property that has changed
     */
    public invalidateVisuals(propertyName?: string): void
    {
        if(propertyName == INVALIDATE_DROP)
        {
            const activeInput = this._relationManager.getActiveInput();
            this._relationManager.setActiveInput(null);

            //drop not on input
            if(!activeInput)
            {
                this.destroy();
                this.start = null;
                this.end = null;
            }
            //drop on input peer
            else
            {
                if (activeInput.addRelation(this))
                {
                    this.end = activeInput.getCoordinates();
                }
                else
                {
                    this.destroy();
                    this.start = null;
                    this.end = null;
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
            const half = (this.end.y - this.start.y) / 2;
            
            if(width < 12)
            {
                width = 12;
            }

            width *= 1.3;

            points = 
            [
                [this.start.x, this.start.y],
                [this.start.x + width, this.start.y + half],
                [this.end.x - width, this.start.y + half],
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

        this._path.attr('d', this._lineGenerator(points));
    }
}