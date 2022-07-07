import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, HostBinding, HostListener} from '@angular/core';
import {CommonModule} from '@angular/common';

const DEFAULT_BACKGROUND_SIZE = 16;
const SCALE_FACTOR_MIN = 0.2;
const SCALE_FACTOR_MAX = 2;

interface Point
{
    x: number;
    y: number;
}

enum MouseButton
{
    LEFT = 1
}

//TODO move to utils class
function clamp(num: number, min: number, max: number)
{
    return Math.min(Math.max(num, min), max);
}

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
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsCanvasSAComponent implements OnDestroy
{
    //######################### private properties #########################

    /**
     * Background pattern size
     */
    private _backgroundSize: number = DEFAULT_BACKGROUND_SIZE;

    /**
     * Last mouse down position
     */
    private _mouseDownPosition: Point = {x: 0, y: 0};

    /**
     * Last mouse up position
     */
    private _mouseUpPosition: Point = {x: 0, y: 0};

    //######################### protected properties - host bindings #########################

    @HostBinding('style.backgroundSize')
    protected get _backgroundSizeStyle(): string
    {
        return `${this._backgroundSize}px ${this._backgroundSize}px`;
    }

    @HostBinding('style.backgroundPosition')
    protected get _backgroundPositionStyle(): string
    {
        return `${this._canvasPosition.x % this._backgroundSize}px ${this._canvasPosition.y % this._backgroundSize}px`;
    }

    //######################### protected properties - template bindings #########################

    
    /**
     * Canvas position
     */
    protected _canvasPosition: Point = {x: 0, y: 0};

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

    public nodeDefinitions: any[] = [];

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef)
    {
        console.log(changeDetector);
    }

    //######################### public methods - overrides #########################

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {}

    //######################### public methods #########################

    //######################### protected methods #########################

    //######################### protected methods - template bindings #########################

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
            this._mouseDownPosition = {
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
                x: this._mouseUpPosition.x + event.clientX - this._mouseDownPosition.x,
                y: this._mouseUpPosition.y + event.clientY - this._mouseDownPosition.y,
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
            this._mouseUpPosition = {
                x: this._mouseUpPosition.x + event.clientX - this._mouseDownPosition.x,
                y: this._mouseUpPosition.y + event.clientY - this._mouseDownPosition.y,
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

            this._mouseUpPosition = {
                x: this._canvasPosition.x,
                y: this._canvasPosition.y
            };
            this._backgroundSize = DEFAULT_BACKGROUND_SIZE * this._zoomLevel;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
    }
}