import {Directive, ElementRef, HostBinding, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {Coordinates, RelationsEndpoint, RelationsNode} from '../interfaces';
import {NodeRelationPath} from '../misc/nodeRelationPath';
import {RelationsNodeManager} from '../services';
import {RelationsCanvasComponent} from './relationsCanvas/relationsCanvas.component';

/**
 * Base class for relations node endpoints (inputs/outputs)
 */
@Directive()
export abstract class RelationNodeEndpointBase implements RelationsEndpoint, OnInit
{
    //######################### protected properties #########################

    /**
     * Canvas position change subscription
     */
    protected canvasPositionChangeSubscription: Subscription|null = null;

    /**
     * Node relation
     */
    protected relation: NodeRelationPath|null|undefined;

    /**
     * Indication whether component is dragging
     */
    protected isDragging: boolean = false;

    /**
     * Indication whether node endpoint is highlighted
     */
    @HostBinding('class.highlighted')
    protected isHighlighted: boolean = false;

    /**
     * Last mouse move position
     */
    protected lastMouseMovePosition: Coordinates = 
    {
        x: 0,
        y: 0
    };

    //######################### public properties - implementation of RelationsEndpoint #########################

    /**
     * @inheritdoc
     */
    @Input()
    public name: string|undefined|null;

    /**
     * @inheritdoc
     */
    public get parentId(): string
    {
        return this.parent?.id ?? '';
    }

    //######################### public properties - inputs #########################

    /**
     * Parent zoom level
     */
    @Input()
    public zoomLevel: number = 1;

    /**
     * Parent node coordinates
     */
    @Input()
    public parentCoordiantes: Coordinates = 
    {
        x: 0,
        y: 0
    };

    /**
     * Instance of parent node
     */
    @Input()
    public parent: RelationsNode|undefined|null;

    //######################### constructor #########################
    constructor(protected element: ElementRef<HTMLElement>,
                protected relationManager: RelationsNodeManager,
                protected canvas: RelationsCanvasComponent,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        if(!this.parent)
        {
            throw new Error('Every input or output endpoint must have parent specified');
        }
    }

    //######################### public methods #########################

    /**
     * @inheritdoc
     */
    public getCoordinates(): Coordinates
    {
        return {
            x: this.parentCoordiantes.x + this.element.nativeElement.offsetLeft + this.element.nativeElement.offsetWidth/2,
            y: this.parentCoordiantes.y + this.element.nativeElement.offsetTop + this.element.nativeElement.offsetHeight/2
        };
    }

    /**
     * Highlight node endpoit
     */
    public highlight(): void
    {
        this.isHighlighted = true;
    }

    /**
     * Cancel highlight for node endpoint
     */
    public cancelHighlight(): void
    {
        this.isHighlighted = false;
    }

    /**
     * Updates relation coordinates
     */
    public abstract updateRelation(): void;
}