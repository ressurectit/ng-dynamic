import {Component, ChangeDetectionStrategy, HostBinding, HostListener} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RelationNodeSAComponent} from '../node/node.component';
import {Coordinates} from '../../interfaces';
import {clamp, MouseButton} from '../../misc';

/**
 * Default background size in pixels
 */
const DEFAULT_BACKGROUND_SIZE = 16;

/**
 * Minimum scale factor
 */
const SCALE_FACTOR_MIN = 0.2;

/**
 * Maximum sclae factor
 */
const SCALE_FACTOR_MAX = 2;

/**
 * Component used as designer component wrapper for layout component
 */
@Component(
{
    selector: 'relations-canvas',
    templateUrl: 'relationsCanvas.component.html',
    styleUrls: ['relationsCanvas.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
        RelationNodeSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsCanvasSAComponent
{
    //######################### private properties #########################

    /**
     * Background pattern size
     */
    private _backgroundSize: number = DEFAULT_BACKGROUND_SIZE;

    /**
     * Last mouse down position
     */
    private _lastMouseDownPosition: Coordinates = {
        x: 0, 
        y: 0
    };

    /**
     * Last mouse up position
     */
    private _lastMouseUpPosition: Coordinates = {
        x: 0, 
        y: 0
    };

    //######################### protected properties - host bindings #########################

    /**
     * Background size css styles
     */
    @HostBinding('style.backgroundSize')
    protected get _backgroundSizeStyle(): string
    {
        return `${this._backgroundSize}px ${this._backgroundSize}px`;
    }

    /**
     * Background position css styles
     */
    @HostBinding('style.backgroundPosition')
    protected get _backgroundPositionStyle(): string
    {
        return `${this._canvasPosition.x % this._backgroundSize}px ${this._canvasPosition.y % this._backgroundSize}px`;
    }

    //######################### protected properties - template bindings #########################

    /**
     * Canvas position
     */
    protected _canvasPosition: Coordinates = {x: 0, y: 0};

    /**
     * Zoom level
     */
    protected _zoomLevel = 1;

    /**
     * Indication whether canvas is being dragged
     */
    protected _isDragging: boolean = false;

    //######################### protected properties - overrides #########################

    //######################### protected properties - children #########################

    //######################### public properties #########################

    /**
     * Sample data to render
     */
    public nodeDefinitions: number[] = [ 1, 2, 3];

    //######################### constructor #########################

    constructor()
    {}

    //######################### protected methods - host listeners #########################

    /**
     * Mouse down event
     * @param event 
     */
    @HostListener('mousedown', ['$event'])
    protected _onMouseDown(event: MouseEvent): void
    {
        if (event.buttons == MouseButton.LEFT)
        {
            this._lastMouseDownPosition = {
                x: event.clientX,
                y: event.clientY
            };
            this._isDragging = true;
        }
    }

    /**
     * Mouse move event
     * @param event 
     */
    @HostListener('mousemove', ['$event'])
    protected _onMouseMove(event: MouseEvent): void
    {
        if (this._isDragging)
        {
            this._canvasPosition = {
                x: this._lastMouseUpPosition.x + event.clientX - this._lastMouseDownPosition.x,
                y: this._lastMouseUpPosition.y + event.clientY - this._lastMouseDownPosition.y,
            };

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
            this._lastMouseUpPosition = {
                x: this._lastMouseUpPosition.x + event.clientX - this._lastMouseDownPosition.x,
                y: this._lastMouseUpPosition.y + event.clientY - this._lastMouseDownPosition.y,
            };
        }
    }

    /**
     * Wheel event
     * @param event 
     */
    @HostListener('wheel', ['$event'])
    protected _onWheel(event: WheelEvent): void
    {
        if (event.deltaY)
        {
            const newZoomLevel = clamp(this._zoomLevel + (event.deltaY > 1 ? -1 : 1) * 0.05, SCALE_FACTOR_MIN, SCALE_FACTOR_MAX);            
            this._canvasPosition = {
                x: (this._canvasPosition.x/this._zoomLevel) * newZoomLevel,
                y: (this._canvasPosition.y/this._zoomLevel) * newZoomLevel,
            };
            this._zoomLevel = newZoomLevel;

            this._lastMouseUpPosition = {
                x: this._canvasPosition.x,
                y: this._canvasPosition.y
            };
            this._backgroundSize = DEFAULT_BACKGROUND_SIZE * this._zoomLevel;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
    }
}