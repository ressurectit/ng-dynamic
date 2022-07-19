import {Component, ChangeDetectionStrategy, HostBinding, HostListener, ViewChild, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {select} from 'd3';

import {Coordinates, RelationsNodeMetadata} from '../../interfaces';
import {RelationsNodeManager} from '../../services';
import {NodeRelationPath} from '../../misc/nodeRelationPath';
import {MouseButton} from '../../misc/enums';
import {clamp} from '../../misc/utils';
import {RelationsNodeRendererSADirective} from '../../directives';

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
 * TODO
 * - Zoom to point
 */
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
        RelationsNodeRendererSADirective,
    ],
    providers:
    [
        RelationsNodeManager,
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
    private _lastMouseDownPosition: Coordinates = 
    {
        x: 0, 
        y: 0
    };

    /**
     * Last mouse up position
     */
    private _lastMouseUpPosition: Coordinates = 
    {
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

    //######################### protected properties - children #########################

    /**
     * Node relations svg group
     */
    @ViewChild('relationsGroup', {read: ElementRef})
    protected _relationsGroup: ElementRef|null|undefined;

    //######################### public properties #########################

    /**
     * Sample data to render
     */
    public nodeDefinitions: RelationsNodeMetadata[] = 
    [
        {
            id: 'sample-changes',
            package: 'basic-components',
            name: 'sampleChange',
            relationsOptions: null,
            outputs: [],
            nodeMetadata:
            {
                coordinates: 
                {
                    x: 30,
                    y: 60
                },
                options: null
            }
        }
    ];

    //######################### constructor #########################
    constructor(private _relationManager: RelationsNodeManager,)
    {
    }

    //######################### public methods #########################

    /**
     * Creates node relation path
     */
    public createRelation(): NodeRelationPath
    {
        return new NodeRelationPath(select(this._relationsGroup?.nativeElement), this._relationManager, null, null);
    }

    //######################### protected methods - host listeners #########################

    /**
     * Mouse down event, handles moving of canvas
     * @param event - Mouse event that occured
     */
    @HostListener('mousedown', ['$event'])
    protected _onMouseDown(event: MouseEvent): void
    {
        if (event.buttons == MouseButton.LEFT)
        {
            this._lastMouseDownPosition = 
            {
                x: event.clientX,
                y: event.clientY
            };
            
            this._isDragging = true;
        }
    }

    /**
     * Mouse move event, handles moving of canvas
     * @param event - Mouse event that occured
     */
    @HostListener('mousemove', ['$event'])
    protected _onMouseMove(event: MouseEvent): void
    {
        if (this._isDragging)
        {
            this._canvasPosition = 
            {
                x: this._lastMouseUpPosition.x + event.clientX - this._lastMouseDownPosition.x,
                y: this._lastMouseUpPosition.y + event.clientY - this._lastMouseDownPosition.y,
            };

        }
    }

    /**
     * Mouse up event, handles moving of canvas
     * @param event - Mouse event that occured
     */
    @HostListener('window:mouseup', ['$event'])
    protected _onMouseUp(event: MouseEvent): void
    {
        if (this._isDragging)
        {
            this._isDragging = false;

            this._lastMouseUpPosition = 
            {
                x: this._lastMouseUpPosition.x + event.clientX - this._lastMouseDownPosition.x,
                y: this._lastMouseUpPosition.y + event.clientY - this._lastMouseDownPosition.y,
            };
        }
    }

    /**
     * Wheel event, used for zooming
     * @param event - Wheel event that occured
     */
    @HostListener('wheel', ['$event'])
    protected _onWheel(event: WheelEvent): void
    {
        if (event.deltaY)
        {
            const newZoomLevel = clamp(this._zoomLevel + (event.deltaY > 1 ? -1 : 1) * 0.05, SCALE_FACTOR_MIN, SCALE_FACTOR_MAX);            
            
            this._canvasPosition = 
            {
                x: (this._canvasPosition.x/this._zoomLevel) * newZoomLevel,
                y: (this._canvasPosition.y/this._zoomLevel) * newZoomLevel,
            };

            this._zoomLevel = newZoomLevel;

            this._lastMouseUpPosition = 
            {
                x: this._canvasPosition.x,
                y: this._canvasPosition.y
            };

            this._backgroundSize = DEFAULT_BACKGROUND_SIZE * this._zoomLevel;
        }
        
        event.preventDefault();
        event.stopImmediatePropagation();
    }
}