import {Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DndService, DragSource, DropTarget, DropTargetMonitor} from '@ng-dnd/core';
import {filter, Subscription} from 'rxjs';

import {LayoutComponentDragData} from '../../../../interfaces';
import {DragActiveService} from '../../../../services';
import {DndBusService} from '../../services';
import {LayoutDragItem, LayoutDropResult} from './dndCoreDesigner.interface';

/**
 * Directive used for initializing and handling dnd core functionality
 */
@Directive(
{
    selector: '[dndCoreDesigner]',
    exportAs: 'dndCoreDesigner',
})
export class DndCoreDesignerDirective implements OnInit, OnDestroy
{
    //######################### protected properties #########################
    
    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    //######################### public properties #########################

    /**
     * Drag source used for dragging component
     */
    public drag: DragSource<LayoutDragItem, LayoutDropResult> = this.dnd.dragSource('COMPONENT',
    {
        beginDrag: () =>
        {
            this.designerElement.nativeElement.classList.add('hidden');
            this.draggingSvc.setDragging(true);

            return {
                dragData: this.dragData,
            };
        },
        canDrag: () => !this.dragDisabled,
        endDrag: monitor =>
        {
            //dropped outside of any dropzone
            if(!monitor.didDrop())
            {
                this.designerElement.nativeElement.classList.remove('hidden');
            }
            //dropped into drop zone
            else
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
            }

            this.bus.setDropPlaceholderPreview(null);
            this.draggingSvc.setDragging(false);
        },
    }, this.initSubscriptions);

    /**
     * Drop zone target that handles drop of component
     */
    public dropzone: DropTarget<LayoutDragItem, LayoutDropResult> = this.dnd.dropTarget(['COMPONENT', 'METADATA'],
    {
        canDrop: (monitor) =>
        {
            return (this.canDrop || this.parentCanDrop) && monitor.isOver({shallow: true});
        },
        drop: monitor =>
        {
            //TODO: get proper index if drop on parent itself

            return <LayoutDropResult>{
                index: this.getIndex(monitor),
                id: this.canDrop ? this.dragData.metadata?.id : this.dragData.parentId,
            };
        },
        hover: monitor =>
        {
            if(monitor.isOver({shallow: true}))
            {
                this.bus.setDropPlaceholderPreview(
                {
                    index: this.getIndex(monitor),
                    parentId: this.canDrop ? this.dragData.metadata?.id : this.dragData.parentId,
                    placeholder: 
                    {
                        height: 0,
                        width: 0
                    }
                });

                return <LayoutDropResult>{
                    index: this.getIndex(monitor),
                    id: this.canDrop ? this.dragData.metadata?.id : this.dragData.parentId,
                };

                


                // console.log('hover', monitor.getClientOffset());
                // console.log('hover', monitor.getDifferenceFromInitialOffset());
                // console.log('hover', monitor.getInitialClientOffset());
                // console.log('hover', monitor.getInitialSourceClientOffset());
                // console.log('hover', monitor.getSourceClientOffset());
                // console.log('hover', {id: this.renderedType?.displayName ?? this.renderedType?.id, package: this.renderedType?.package, name: this.renderedType?.name});
            }
        }
    }, this.initSubscriptions);

    //######################### public properties - inputs #########################

    /**
     * Indication whether is flow of items horizontal or vertical
     */
    @Input()
    public horizontal: boolean = false;

    /**
     * Html element that represents dropzone
     */
    @Input()
    public dropzoneElement!: HTMLElement;

    /**
     * Instance of drag data for this component
     */
    @Input('dndCoreDesigner')
    public dragData!: LayoutComponentDragData;

    /**
     * Indication whether is drag disabled
     */
    @Input()
    public dragDisabled: boolean = false;

    /**
     * Indication whether child can be dropped on this component
     */
    @Input()
    public canDrop: boolean = false;

    /**
     * Indication whether child can be dropped on this parent component
     */
    @Input()
    public parentCanDrop: boolean = false;

    //######################### public properties - outputs #########################

    /**
     * Occurs when metadata are dropped here
     */
    @Output()
    public dropMetadata: EventEmitter<LayoutComponentDragData> = new EventEmitter<LayoutComponentDragData>();

    //######################### constructor #########################
    constructor(protected dnd: DndService,
                protected designerElement: ElementRef<HTMLElement>,
                protected draggingSvc: DragActiveService,
                protected bus: DndBusService,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        if(!this.dropzoneElement)
        {
            throw new Error('DndCoreDesignerDirective: missing dropzone element!');
        }

        if(!this.dragData)
        {
            throw new Error('DndCoreDesignerDirective: missing drag data!');
        }

        this.initSubscriptions.add(this.bus
                                       .dropDataChange
                                       .pipe(filter(itm => itm.id === this.dragData.metadata?.id))
                                       .subscribe(itm => this.dropMetadata.emit(itm.data)));

        this.initSubscriptions.add(this.bus
                                       .oldDropPlaceholderPreviewChange
                                       .pipe(filter(itm => itm.parentId === this.dragData.metadata?.id))
                                       .subscribe(itm => console.log('old', itm)));

        this.initSubscriptions.add(this.bus
                                       .newDropPlaceholderPreviewChange
                                       .pipe(filter(itm => itm.parentId === this.dragData.metadata?.id))
                                       .subscribe(itm => console.log('new', itm)));
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();
    }

    //######################### protected methods #########################

    /**
     * Gets new index of drop item
     * @param monitor - Monitor to be used for obtaining information about index
     */
    protected getIndex(monitor: DropTargetMonitor): number
    {
        const rect = this.dropzoneElement.getBoundingClientRect();
        const offset = monitor.getClientOffset();
        
        if(!offset)
        {
            return 0;
        }

        const coordinates = {x: offset.x - rect.x, y: offset.y - rect.y};
        const half = rect.height / 2;

        if(coordinates.y <= half)
        {
            return this.dragData.index ?? 0;
        }
        else
        {
            return (this.dragData.index ?? 0) + 1;
        }
    }
}