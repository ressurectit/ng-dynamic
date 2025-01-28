import {Directive, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {generateId, isBlank, nameof} from '@jscrpt/common';
import {extend} from '@jscrpt/common/extend';
import {DndService, DragSource} from '@ng-dnd/core';
import {Subscription} from 'rxjs';

import {LayoutComponentDragData, LayoutDragItem, LayoutDropResult} from '../../interfaces';
import {DndBusService, DragActiveService} from '../../services';

let emptyImage: HTMLImageElement;

/**
 * Returns a 0x0 empty GIF for use as a drag preview.
 */
function getEmptyImage()
{
    if(!emptyImage)
    {
        emptyImage = new Image();
        emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    }

    return emptyImage;
}

/**
 * Directive used for initializing and handling dnd core functionality for layout component palette item
 */
@Directive(
{
    selector: '[dndCorePaletteItem]',
})
export class DndCorePaletteItemDirective implements OnInit, OnChanges, OnDestroy
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
     * Subscription for drag preview
     */
    protected dragPreviewConnection: Subscription|undefined|null;

    /**
     * Drag source used for dragging palette item
     */
    protected drag: DragSource<LayoutDragItem, LayoutDropResult>;

    //######################### public properties - inputs #########################

    /**
     * Instance of drag data for this component
     */
    @Input({required: true, alias: 'dndCorePaletteItem'})
    public dragData!: LayoutComponentDragData;

    /**
     * Default drag type for dragging components
     */
    @Input({required: true})
    public customDragType: string|undefined|null;

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
        this.drag = this.dnd.dragSource('METADATA',
                                        {
                                            beginDrag: () =>
                                            {
                                                this.draggingSvc.setDragging(true);
                                                const dragData = extend(true, {}, this.dragData);

                                                if(dragData.metadata)
                                                {
                                                    const generatedId = generateId(16);
                                                    const newId = `${dragData.metadata.name}-${generatedId}`;

                                                    dragData.metadata.id = newId;
                                                    dragData.metadata.displayName = dragData?.metadata.displayName && dragData?.metadata.displayName != '' ? `${dragData?.metadata.displayName}-${generatedId}` : newId;
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

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * @inheritdoc
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<DndCorePaletteItemDirective>('customDragType') in changes)
        {
            if(!isBlank(this.customDragType))
            {
                this.drag.setType(this.customDragType);
            }
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

        this.dragPreviewConnection?.unsubscribe();
        this.dragPreviewConnection = null;

        this.drag.unsubscribe();
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
            this.dragPreviewConnection = this.drag.connectDragPreview(getEmptyImage());
        });
    }
}