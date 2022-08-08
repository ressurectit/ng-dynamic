import {ContentChild, Directive, ElementRef, EmbeddedViewRef, EventEmitter, Inject, Input, NgZone, OnDestroy, OnInit, Output} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {BindThis} from '@jscrpt/common';
import {DndService, DragSource, DropTarget, DropTargetMonitor} from '@ng-dnd/core';
import {filter, Subscription} from 'rxjs';

import {LayoutComponentDragData} from '../../../../interfaces';
import {DragActiveService, LayoutEditorMetadataManager} from '../../../../services';
import {DndBusService, DropPlaceholderPreview} from '../../services';
import {LayoutDragItem, LayoutDropResult} from './dndCoreDesigner.interface';

/**
 * Directive used for initializing and handling dnd core functionality for layout designer
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

    /**
     * Subscription for placeholder connection to DOM
     */
    protected placeholderConnection: Subscription|undefined|null;

    /**
     * Subscription for container connection to DOM
     */
    protected containerConnection: Subscription|undefined|null;

    /**
     * Current component element
     */
    protected componentElement: HTMLElement|undefined|null;

    /**
     * Element that represents placeholder preview
     */
    protected placeholderPreviewElement: HTMLElement|undefined|null;

    /**
     * Drop zone target that handles drop of component
     */
    protected placeholderDrop: DropTarget<LayoutDragItem, LayoutDropResult> = this.dnd.dropTarget(['COMPONENT', 'METADATA'],
                                                                                                  {
                                                                                                      canDrop: () => true,
                                                                                                      drop: () =>
                                                                                                      {
                                                                                                          return <LayoutDropResult>{
                                                                                                              index: this.bus.dropPlaceholderPreviewIndex,
                                                                                                              id: this.dragData.metadata?.id,
                                                                                                          };
                                                                                                      },
                                                                                                  }, this.initSubscriptions);

    /**
     * Drop zone target that handles drop of component
     */
    protected containerDrop: DropTarget<LayoutDragItem, LayoutDropResult> = this.dnd.dropTarget(['COMPONENT', 'METADATA'],
                                                                                                {
                                                                                                    canDrop: monitor => this.parentCanDrop && monitor.isOver({shallow: true}),
                                                                                                    drop: monitor =>
                                                                                                    {
                                                                                                        const index = this.getIndex(monitor);

                                                                                                        return <LayoutDropResult>{
                                                                                                            index: index,
                                                                                                            id: this.dragData.parentId,
                                                                                                        };
                                                                                                    },
                                                                                                    hover: monitor =>
                                                                                                    {
                                                                                                        if(monitor.isOver({shallow: true}))
                                                                                                        {
                                                                                                            const index = this.getIndex(monitor);

                                                                                                            this.bus.setDropPlaceholderPreview(
                                                                                                            {
                                                                                                                index: index,
                                                                                                                parentId: this.dragData.parentId,
                                                                                                                placeholder:
                                                                                                                {
                                                                                                                    height: 0,
                                                                                                                    width: 0
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                    }
                                                                                                }, this.initSubscriptions);

    //######################### protected properties - children #########################

    /**
     * Instance of layout component renderer
     */
    @ContentChild(LayoutComponentRendererSADirective, {static: true})
    protected layoutComponentRendererDirective?: LayoutComponentRendererSADirective;

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
                                                                                    },
                                                                                    this.initSubscriptions);

    /**
     * Drop zone target that handles drop of component
     */
    public dropzone: DropTarget<LayoutDragItem, LayoutDropResult> = this.dnd.dropTarget(['COMPONENT', 'METADATA'],
                                                                                        {
                                                                                            canDrop: monitor => (this.canDrop || this.parentCanDrop) && monitor.isOver({shallow: true}),
                                                                                            drop: monitor =>
                                                                                            {
                                                                                                const index = this.getIndex(monitor);

                                                                                                return <LayoutDropResult>{
                                                                                                    index: this.canDrop && this.dragData.metadata ? (index === 0 ? 0 : ((this.manager.getChildrenCount(this.dragData.metadata.id)) ?? 0) - 1) : index,
                                                                                                    id: this.canDrop ? this.dragData.metadata?.id : this.dragData.parentId,
                                                                                                };
                                                                                            },
                                                                                            hover: monitor =>
                                                                                            {
                                                                                                if(monitor.isOver({shallow: true}))
                                                                                                {
                                                                                                    const index = this.getIndex(monitor);

                                                                                                    this.bus.setDropPlaceholderPreview(
                                                                                                    {
                                                                                                        index: this.canDrop && this.dragData.metadata ? (index === 0 ? 0 : ((this.manager.getChildrenCount(this.dragData.metadata.id)) ?? 0) - 1) : index,
                                                                                                        parentId: this.canDrop ? this.dragData.metadata?.id : this.dragData.parentId,
                                                                                                        placeholder:
                                                                                                        {
                                                                                                            height: 0,
                                                                                                            width: 0
                                                                                                        }
                                                                                                    });
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
                protected manager: LayoutEditorMetadataManager,
                protected bus: DndBusService,
                protected zone: NgZone,
                @Inject(DOCUMENT) protected document: Document,)
    {
        this.connectDropToContainer();
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

        this.initSubscriptions.add(this.layoutComponentRendererDirective?.componentChange.subscribe(componentRef =>
        {
            if(!componentRef)
            {
                this.componentElement = null;

                return;
            }

            this.componentElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        }));

        this.initSubscriptions.add(this.bus
                                       .dropDataChange
                                       .pipe(filter(itm => itm.id === this.dragData.metadata?.id))
                                       .subscribe(itm => this.dropMetadata.emit(itm.data)));

        this.initSubscriptions.add(this.bus
                                       .oldDropPlaceholderPreviewChange
                                       .pipe(filter(itm => itm.parentId === this.dragData.metadata?.id))
                                       .subscribe(() =>
                                       {
                                           this.placeholderPreviewElement?.remove();
                                           this.placeholderPreviewElement = null;
                                       }));

        this.initSubscriptions.add(this.bus
                                       .newDropPlaceholderPreviewChange
                                       .pipe(filter(itm => itm.parentId === this.dragData.metadata?.id))
                                       .subscribe(this.showPlaceholderPreview));
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();

        this.placeholderConnection?.unsubscribe();
        this.placeholderConnection = null;

        this.containerConnection?.unsubscribe();
        this.containerConnection = null;
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

    /**
     * Shows placeholder preview at specified location
     * @param preview - Instance of preview data
     */
    @BindThis
    protected showPlaceholderPreview(preview: DropPlaceholderPreview): void
    {
        if(!this.componentElement)
        {
            return;
        }

        this.placeholderPreviewElement ??= this.document.createElement('div');
        this.placeholderPreviewElement.style.border = '2px solid blue';
        this.placeholderPreviewElement.remove();

        this.connectDropToPlaceholder();
        this.componentElement.insertBefore(this.placeholderPreviewElement, this.componentElement.children[preview.index]);
    }

    /**
     * Connects placeholder preview element to placeholder drop
     */
    protected connectDropToPlaceholder(): void
    {
        this.zone.runOutsideAngular(() =>
        {
            this.placeholderConnection?.unsubscribe();

            if(this.placeholderPreviewElement)
            {
                this.placeholderConnection = this.placeholderDrop.connectDropTarget(this.placeholderPreviewElement);
            }
        });
    }

    /**
     * Connects container element to container drop
     */
    protected connectDropToContainer(): void
    {
        this.zone.runOutsideAngular(() =>
        {
            this.containerConnection?.unsubscribe();
            this.containerConnection = this.containerDrop.connectDropTarget(this.designerElement.nativeElement);
        });
    }
}