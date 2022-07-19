import {Directive, ElementRef, Input, OnInit} from '@angular/core';

import {Coordinates, RelationsEndpoint, RelationsNode} from '../interfaces';
import {NodeRelationPath} from '../misc/nodeRelationPath';
import {RelationsNodeManager} from '../services';
import {RelationsCanvasSAComponent} from './relationsCanvas/relationsCanvas.component';

/**
 * Base class for relations node endpoints (inputs/outputs)
 */
@Directive()
export abstract class RelationNodeEndpointBase implements RelationsEndpoint, OnInit
{
    //######################### protected properties #########################

    /**
     * Node relation
     */
    protected _relation: NodeRelationPath|null|undefined;

    /**
     * Indication whether component is dragging
     */
    protected _isDragging: boolean = false;

    /**
     * Last mouse down position
     */
    protected _lastMouseDownPosition: Coordinates = 
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
    constructor(protected _element: ElementRef<HTMLElement>,
                protected _relationManager: RelationsNodeManager,
                protected _canvas: RelationsCanvasSAComponent,)
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
            x: this.parentCoordiantes.x + this._element.nativeElement.offsetLeft + this._element.nativeElement.offsetWidth/2,
            y: this.parentCoordiantes.y + this._element.nativeElement.offsetTop + this._element.nativeElement.offsetHeight/2
        };
    }

    /**
     * Updates relation coordinates
     */
    public abstract updateRelation(): void;
}