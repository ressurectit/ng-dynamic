import {Directive, ElementRef, Input} from '@angular/core';

import {Coordinates} from '../../interfaces';

@Directive()
export class RelationNodePointBase
{
    //######################### protected properties #########################

    /**
     * Indication whether component is dragging
     */
    protected _isDragging: boolean = false;

    /**
     * Last mouse down position
     */
    protected _lastMouseDownPosition: Coordinates = {
        x: 0,
        y: 0
    };

    //######################### public properties - inputs and outputs #########################

    /**
     * Parent zoom level
     */
    @Input()
    public zoomLevel: number = 1;

    /**
     * Parent node coordinates
     */
    @Input()
    public parentCoordiantes: Coordinates = {
        x: 0,
        y: 0
    };

    //######################### constructor #########################

    constructor(protected _element: ElementRef<HTMLElement>)
    {}

    //######################### public methods #########################

    public getCoordinates(): Coordinates
    {
        return {
            x: this.parentCoordiantes.x + this._element.nativeElement.offsetLeft + this._element.nativeElement.offsetWidth/2,
            y: this.parentCoordiantes.y + this._element.nativeElement.offsetTop + this._element.nativeElement.offsetHeight/2
        };
    }
}