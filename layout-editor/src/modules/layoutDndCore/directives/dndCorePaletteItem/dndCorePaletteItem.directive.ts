import {Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output} from '@angular/core';
import {extend, generateId} from '@jscrpt/common';
import {DndService, DragSource} from '@ng-dnd/core';
import {Subscription} from 'rxjs';

import {LayoutComponentDragData} from '../../../../interfaces';
import {DragActiveService} from '../../../../services';
import {DndBusService} from '../../services';
import {LayoutDragItem, LayoutDropResult} from '../dndCoreDesigner/dndCoreDesigner.interface';

/**
 * Directive used for initializing and handling dnd core functionality for layout component palette item
 */
@Directive(
{
    selector: '[dndCorePaletteItem]',
})
export class DndCorePaletteItemDirective implements OnInit, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Subscription for palette item connection to DOM
     */
    protected itemConnection: Subscription|undefined|null;

    /**
     * Drag source used for dragging palette item
     */
    protected drag: DragSource<LayoutDragItem, LayoutDropResult> = this.dnd.dragSource('METADATA',
                                                                                       {
                                                                                           beginDrag: () =>
                                                                                           {
                                                                                               this.draggingSvc.setDragging(true);
                                                                                               const dragData = extend(true, {}, this.dragData);

                                                                                               if(dragData.metadata)
                                                                                               {
                                                                                                   const newId = `${dragData.metadata.name}-${generateId(16)}`;

                                                                                                   dragData.metadata.id = newId;
                                                                                                   dragData.metadata.displayName = newId;
                                                                                               }

                                                                                               return {
                                                                                                   dragData,
                                                                                               };
                                                                                           },
                                                                                           endDrag: monitor =>
                                                                                           {
                                                                                               //dropped into drop zone
                                                                                               if(monitor.didDrop())
                                                                                               {
                                                                                                   const item = monitor.getItem();
                                                                                                   const dropResult = monitor.getDropResult();

                                                                                                   if(!item)
                                                                                                   {
                                                                                                       return;
                                                                                                   }

                                                                                                   item.dragData.index = dropResult.index;

                                                                                                   this.bus.setDropData(
                                                                                                   {
                                                                                                       data: item.dragData,
                                                                                                       id: dropResult.id,
                                                                                                   });

                                                                                                   this.itemDrop.emit();
                                                                                               }

                                                                                               this.bus.setDropPlaceholderPreview(null);
                                                                                               this.draggingSvc.setDragging(false);
                                                                                           },
                                                                                       },
                                                                                       this.initSubscriptions);

    //######################### public properties - inputs #########################

    /**
     * Instance of drag data for this component
     */
    @Input('dndCorePaletteItem')
    public dragData!: LayoutComponentDragData;

    //######################### public properties - outputs #########################

    /**
     * Occurs when item was succesfully dropped
     */
    @Output()
    public itemDrop: EventEmitter<void> = new EventEmitter<void>();

    //######################### constructor #########################
    constructor(protected dnd: DndService,
                protected paletteItemElement: ElementRef<HTMLElement>,
                protected draggingSvc: DragActiveService,
                protected bus: DndBusService,
                protected zone: NgZone,)
    {
        this.connectDragToItem();
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        if(!this.dragData)
        {
            throw new Error('DndCoreDesignerDirective: missing drag data!');
        }
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();

        this.itemConnection?.unsubscribe();
        this.itemConnection = null;
    }

    //######################### protected methods #########################

    /**
     * Connects palette item element to drag source
     */
    protected connectDragToItem(): void
    {
        this.zone.runOutsideAngular(() =>
        {
            this.itemConnection?.unsubscribe();
            this.itemConnection = this.drag.connectDragSource(this.paletteItemElement.nativeElement, {dropEffect: 'copy'});
        });
    }
}