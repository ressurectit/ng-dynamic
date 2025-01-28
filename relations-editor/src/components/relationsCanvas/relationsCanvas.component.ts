import {Component, ChangeDetectionStrategy, HostBinding, HostListener, ViewChild, ElementRef, Input, Inject, OnInit, ChangeDetectorRef, OnDestroy, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MetadataHistoryManager} from '@anglr/dynamic';
import {select} from 'd3';
import {Subscription} from 'rxjs';

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
 * Maximum scale factor
 */
const SCALE_FACTOR_MAX = 2;

/**
 * Maximal movement delta
 */
const MOVEMENT_DELTA_MAX = 10;

/**
 * Component used as designer component wrapper for relations component
 */
@Component(
{
    selector: 'relations-canvas',
    templateUrl: 'relationsCanvas.component.html',
    imports:
    [
        CommonModule,
        RelationsNodeRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsCanvasSAComponent implements OnInit, OnDestroy
{
    //######################### private properties #########################

    /**
     * Identifier of canvas move timer
     */
    private _canvasMoveTimer: number|null = null;

    //######################### protected properties #########################

    /**
     * Subscriptions created during initialization
     */
    protected _initSubscriptions: Subscription = new Subscription();

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
     * Mouse position in canvas
     */
    protected mousePosition: Coordinates = {x: 0, y: 0};

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
    public get boundingBox(): DOMRect
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
     * Node definition data to render
     */
    @Input()
    public nodeDefinitions: RelationsNodeMetadata[] = [];

    //######################### public properties - outputs #########################

    @Output()
    public convasPositionChanged: EventEmitter<void> = new EventEmitter<void>();

    //######################### constructor #########################
    constructor(protected element: ElementRef,
                protected relationManager: RelationsNodeManager,
                private _changeDetector: ChangeDetectorRef,
                @Inject(RELATIONS_HISTORY_MANAGER) protected history: MetadataHistoryManager<RelationsNodeMetadata[]>,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this._initSubscriptions.add(this.relationManager.activeNodeChange.subscribe(() => this.focusNode(this.relationManager.activeNode)));
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._initSubscriptions.unsubscribe();
    }

    //######################### public methods #########################

    /**
     * Focuses canvas to selected node
     * @param id Relations node identifier
     * @returns 
     */
    public focusNode(id?: string|null): void
    {
        if (!id)
        {
            return;
        }

        const node = this.nodeDefinitions?.find(node => node.id === id);

        if (node?.nodeMetadata?.coordinates)
        {
            // this._setZoomLevel(1);
            this.canvasPosition = 
            {
                x: (-node?.nodeMetadata?.coordinates.x) * this.zoomLevel  + this.boundingBox.width/2,
                y: (-node?.nodeMetadata?.coordinates.y) * this.zoomLevel  + this.boundingBox.height/2,
            };
            
            this._changeDetector.detectChanges();
        }
    }

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
        this.mousePosition = {
            x: event.clientX - this.boundingBox.left,
            y: event.clientY - this.boundingBox.top
        };

        if (this.isDragging)
        {
            this.canvasPosition =
            {
                x: event.clientX - this.dragStartPosition.x,
                y: event.clientY - this.dragStartPosition.y
            };
        }
        else
        {
            if (event?.buttons === MouseButton.LEFT)
            {
                if (!this._canvasMoveTimer)
                {
                    this._canvasMoveTimer = setInterval(() =>
                    {
                        const delta: Coordinates = {
                            x: 0,
                            y: 0,
                        };

                        if (this.mousePosition.x >= this.boundingBox.width*0.9)
                        {
                            delta.x -= Math.min((this.mousePosition.x - this.boundingBox.width*0.9)/(this.boundingBox.width/10)*MOVEMENT_DELTA_MAX, MOVEMENT_DELTA_MAX);
                        }
                        else if (this.mousePosition.x <= this.boundingBox.width/10)
                        {
                            delta.x += Math.min((this.boundingBox.width/10 - this.mousePosition.x)/(this.boundingBox.width/10)*MOVEMENT_DELTA_MAX, MOVEMENT_DELTA_MAX);
                        }

                        if (this.mousePosition.y >= this.boundingBox.height*0.9)
                        {
                            delta.y -= Math.min((this.mousePosition.y - this.boundingBox.height*0.9)/(this.boundingBox.height/10)*MOVEMENT_DELTA_MAX, MOVEMENT_DELTA_MAX);
                        }
                        else if (this.mousePosition.y <= this.boundingBox.height/10)
                        {
                            delta.y += Math.min((this.boundingBox.height/10 - this.mousePosition.y)/(this.boundingBox.height/10)*MOVEMENT_DELTA_MAX, MOVEMENT_DELTA_MAX);
                        }

                        if (delta.x != 0 || delta.y != 0)
                        {
                            this.convasPositionChanged.emit();
                            this.canvasPosition.x += delta.x;
                            this.canvasPosition.y += delta.y;
                            this._changeDetector.detectChanges();
                        }
                    }, 33) as unknown as number;
                }
            }
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

        if (this._canvasMoveTimer)
        {
            clearInterval(this._canvasMoveTimer);
            this._canvasMoveTimer = null;
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
            const newZoomLevel = this._calculateNewZoomLevel(event.deltaY > 1 ? -1 : 1);    
            
            const posX = (event.clientX - this.canvasPosition.x - this.boundingBox.left) / this.zoomLevel;
            const posY = (event.clientY - this.canvasPosition.y - this.boundingBox.top) / this.zoomLevel;

            this.canvasPosition.x = event.clientX - this.boundingBox.left - posX*newZoomLevel;
            this.canvasPosition.y = event.clientY - this.boundingBox.top - posY*newZoomLevel;

            this._setZoomLevel(newZoomLevel);
        }
        
        event.preventDefault();
        event.stopImmediatePropagation();
    }

    //######################### public methods #########################

    /**
     * Zooms canvas in by one step
     */
    public zoomIn(): void
    {
        this._setZoomLevel(this._calculateNewZoomLevel(1));
    }

    /**
     * Zooms canvas out by one step
     */
    public zoomOut(): void
    {
        this._setZoomLevel(this._calculateNewZoomLevel(-1));
    }

    /**
     * Resets zoom level
     */
    public resetZoom(): void
    {
        this._setZoomLevel(1);
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

    //######################### private methods #########################

    /**
     * Calculates new zoom level based on dalte
     * @param delta 
     * @returns 
     */
    private _calculateNewZoomLevel(delta: number): number
    {
        return clamp(this.zoomLevel + delta * 0.05, SCALE_FACTOR_MIN, SCALE_FACTOR_MAX);
    }

    /**
     * Sets zoom level
     * @param newZoomLevel new zoom level
     */
    private _setZoomLevel(newZoomLevel: number): void
    {
        this.zoomLevel = newZoomLevel;
        this.backgroundSize = DEFAULT_BACKGROUND_SIZE * this.zoomLevel;
    }
}