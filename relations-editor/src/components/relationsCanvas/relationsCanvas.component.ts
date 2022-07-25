import {Component, ChangeDetectionStrategy, HostBinding, HostListener, ViewChild, ElementRef, Input} from '@angular/core';
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsCanvasSAComponent
{
    //######################### protected properties #########################

    /**
     * Background pattern size
     */
    protected backgroundSize: number = DEFAULT_BACKGROUND_SIZE;

    /**
     * Last mouse down position
     */
    protected lastMouseDownPosition: Coordinates = 
    {
        x: 0, 
        y: 0
    };

    /**
     * Last mouse up position
     */
    protected lastMouseUpPosition: Coordinates = 
    {
        x: 0, 
        y: 0
    };

    //######################### protected properties - host bindings #########################

    /**
     * Background size css styles
     */
    @HostBinding('style.backgroundSize')
    protected get backgroundSizeStyle(): string
    {
        return `${this.backgroundSize}px ${this.backgroundSize}px`;
    }

    /**
     * Background position css styles
     */
    @HostBinding('style.backgroundPosition')
    protected get _backgroundPositionStyle(): string
    {
        return `${this.canvasPosition.x % this.backgroundSize}px ${this.canvasPosition.y % this.backgroundSize}px`;
    }

    //######################### protected properties - template bindings #########################

    /**
     * Canvas position
     */
    protected canvasPosition: Coordinates = {x: 0, y: 0};

    /**
     * Zoom level
     */
    protected zoomLevel = 1;

    /**
     * Indication whether canvas is being dragged
     */
    protected isDragging: boolean = false;

    //######################### protected properties - children #########################

    /**
     * Node relations svg group
     */
    @ViewChild('relationsGroup', {read: ElementRef})
    protected relationsGroup: ElementRef|null|undefined;

    //######################### public properties - inputs #########################

    /**
     * Sample data to render
     */
    @Input()
    public nodeDefinitions: RelationsNodeMetadata[] = [];

    //######################### constructor #########################
    constructor(protected relationManager: RelationsNodeManager,)
    {
    }

    //######################### public methods #########################

    /**
     * Creates node relation path
     */
    public createRelation(): NodeRelationPath
    {
        return new NodeRelationPath(select(this.relationsGroup?.nativeElement), this.relationManager, null, null);
    }

    //######################### protected methods - host listeners #########################

    /**
     * Mouse down event, handles moving of canvas
     * @param event - Mouse event that occured
     */
    @HostListener('mousedown', ['$event'])
    protected onMouseDown(event: MouseEvent): void
    {
        if (event.buttons == MouseButton.LEFT)
        {
            this.lastMouseDownPosition = 
            {
                x: event.clientX,
                y: event.clientY
            };
            
            this.isDragging = true;
        }
    }

    /**
     * Mouse move event, handles moving of canvas
     * @param event - Mouse event that occured
     */
    @HostListener('mousemove', ['$event'])
    protected onMouseMove(event: MouseEvent): void
    {
        if (this.isDragging)
        {
            this.canvasPosition = 
            {
                x: this.lastMouseUpPosition.x + event.clientX - this.lastMouseDownPosition.x,
                y: this.lastMouseUpPosition.y + event.clientY - this.lastMouseDownPosition.y,
            };

        }
    }

    /**
     * Mouse up event, handles moving of canvas
     * @param event - Mouse event that occured
     */
    @HostListener('window:mouseup', ['$event'])
    protected onMouseUp(event: MouseEvent): void
    {
        if (this.isDragging)
        {
            this.isDragging = false;

            this.lastMouseUpPosition = 
            {
                x: this.lastMouseUpPosition.x + event.clientX - this.lastMouseDownPosition.x,
                y: this.lastMouseUpPosition.y + event.clientY - this.lastMouseDownPosition.y,
            };
        }
    }

    /**
     * Wheel event, used for zooming
     * @param event - Wheel event that occured
     */
    @HostListener('wheel', ['$event'])
    protected onWheel(event: WheelEvent): void
    {
        if (event.deltaY)
        {
            const newZoomLevel = clamp(this.zoomLevel + (event.deltaY > 1 ? -1 : 1) * 0.05, SCALE_FACTOR_MIN, SCALE_FACTOR_MAX);            
            
            this.canvasPosition = 
            {
                x: (this.canvasPosition.x/this.zoomLevel) * newZoomLevel,
                y: (this.canvasPosition.y/this.zoomLevel) * newZoomLevel,
            };

            this.zoomLevel = newZoomLevel;

            this.lastMouseUpPosition = 
            {
                x: this.canvasPosition.x,
                y: this.canvasPosition.y
            };

            this.backgroundSize = DEFAULT_BACKGROUND_SIZE * this.zoomLevel;
        }
        
        event.preventDefault();
        event.stopImmediatePropagation();
    }

    //######################### protected methods - template bindings #########################

    /**
     * Destroys node
     * @param node - Definition of node to be destroyed
     */
    protected destroyNode(node: RelationsNodeMetadata): void
    {
        const index = this.nodeDefinitions.indexOf(node);

        if(index < 0)
        {
            return;
        }

        this.nodeDefinitions.splice(index, 1);
    }
}