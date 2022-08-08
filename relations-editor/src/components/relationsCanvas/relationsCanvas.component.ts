import {Component, ChangeDetectionStrategy, HostBinding, HostListener, ViewChild, ElementRef, Input, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MetadataHistoryManager} from '@anglr/dynamic';
import {select} from 'd3';

import {Coordinates, RelationsNodeMetadata} from '../../interfaces';
import {RelationsNodeManager} from '../../services';
import {NodeRelationPath} from '../../misc/nodeRelationPath';
import {MouseButton} from '../../misc/enums';
import {clamp} from '../../misc/utils';
import {RelationsNodeRendererSADirective} from '../../directives';
import {RELATIONS_HISTORY_MANAGER} from '../../misc/tokens';

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
     * Drag start position coordinates
     */
    protected dragStartPosition: Coordinates =
    {
        x: 0,
        y: 0,
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

    
    //######################### protected properties - getters and setters #########################

    /**
     * Canvas bounding box
     */
    protected get boundingBox(): DOMRect
    {
        return this.element.nativeElement.getBoundingClientRect();
    }

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
    constructor(protected element: ElementRef,
                protected relationManager: RelationsNodeManager,
                @Inject(RELATIONS_HISTORY_MANAGER) protected history: MetadataHistoryManager<RelationsNodeMetadata[]>,)
    {
    }

    //######################### public methods #########################

    /**
     * Creates node relation path
     */
    public createRelation(): NodeRelationPath
    {
        return new NodeRelationPath(select(this.relationsGroup?.nativeElement), this.relationManager, this.history, null, null);
    }

    public getPositionInCanvas(point: {x: number, y: number}): Coordinates
    {
        return {
            x: (point.x - this.boundingBox.left - this.canvasPosition.x)/this.zoomLevel,
            y: (point.y - this.boundingBox.top - this.canvasPosition.y)/this.zoomLevel
        };
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
            this.dragStartPosition =
            {
                x: event.clientX - this.canvasPosition.x,
                y: event.clientY - this.canvasPosition.y
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
                x: event.clientX - this.dragStartPosition.x,
                y: event.clientY - this.dragStartPosition.y
            };
        }
    }

    /**
     * Mouse up event, handles moving of canvas
     * @param event - Mouse event that occured
     */
    @HostListener('window:mouseup', ['$event'])
    protected onMouseUp(_: MouseEvent): void
    {
        if (this.isDragging)
        {
            this.isDragging = false;
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
            
            const posX = (event.clientX - this.canvasPosition.x - this.boundingBox.left) / this.zoomLevel;
            const posY = (event.clientY - this.canvasPosition.y - this.boundingBox.top) / this.zoomLevel;

            this.canvasPosition.x = event.clientX - this.boundingBox.left - posX*newZoomLevel;
            this.canvasPosition.y = event.clientY - this.boundingBox.top - posY*newZoomLevel;

            this.zoomLevel = newZoomLevel;
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

        this.history.getNewState();
    }
}