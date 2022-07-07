import {Selection, BaseType, Line, line, curveBundle} from 'd3';

import {Coordinates} from '../interfaces';

/**
 * Class that represents node relation path
 */
export class NodeRelationPath
{
    //######################### private fields #########################

    /**
     * Object that represents rendered path
     */
    private _path: Selection<SVGPathElement, {}, null, undefined>;

    /**
     * Line generator for generating lines
     */
    private _lineGenerator: Line<[number, number]>;

    //######################### public properties #########################

    //######################### constructor #########################

    constructor(private _parentGroup: Selection<BaseType, {}, null, undefined>,
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
    }

    /**
     * Explicitly runs invalidation of content (change detection)
     * @param propertyName Name of property that has changed
     */
    public invalidateVisuals(propertyName?: string): void
    {
        //TODO create drop logic
        // if(propertyName == INVALIDATE_DROP)
        // {
        //     const dropArea = this._getDropArea();

        //     //drop not on input peer
        //     if(!dropArea)
        //     {
        //         this.destroy();
        //         this.start = null;
        //         this.end = null;
        //     }
        //     //drop on input peer
        //     else
        //     {
        //         //can add input relation
        //         if(dropArea.svgNode?.addInputRelation(this, dropArea.inputId, dropArea.dynamic))
        //         {
        //             this.end = dropArea.svgNode.getInputCoordinates(dropArea.inputId, dropArea.dynamic);
        //         }
        //         else if ((dropArea.node)?.addInputRelation(this, dropArea.inputId, dropArea.dynamic))
        //         {
        //             this.end = (dropArea.node).getCoordinates();
        //         }
        //         else
        //         {
        //             this.destroy();
        //             this.start = null;
        //             this.end = null;
        //         }
        //     }
        // }

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