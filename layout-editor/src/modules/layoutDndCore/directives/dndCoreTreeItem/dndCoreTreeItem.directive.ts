import {Directive, ElementRef, EventEmitter, Inject, Injector, Input, NgZone, OnDestroy, OnInit, Output, inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {BindThis, isBlank, isPresent} from '@jscrpt/common';
import {DndService, DragSource, DropTarget, DropTargetMonitor} from '@ng-dnd/core';
import {filter, Subscription} from 'rxjs';

import {LayoutComponentDragData} from '../../../../interfaces';
import {DragActiveService, LayoutEditorMetadataManager} from '../../../../services';
import {DndBusService, DropPlaceholderPreview} from '../../services';
import {LayoutDragItem, LayoutDropResult} from '../dndCoreDesigner/dndCoreDesigner.interface';

/**
 * Directive used for initializing and handling dnd core functionality for layout component tree item
 */
@Directive(
{
    selector: '[dndCoreTreeItem]',
    exportAs: 'dndCoreTreeItem',
})
export class DndCoreTreeItemDirective implements OnInit, OnDestroy
{
    //######################### protected properties #########################
    
    /**
     * NgZone instance
     */
    protected ngZone: NgZone = inject(NgZone);

    /**
     * Current metadata for this component
     */
    protected get metadata(): LayoutComponentMetadata
    {
        if(!this.dragData.metadata)
        {
            throw new Error('DndCoreTreeItemDirective: invalid drag data without metadata!');
        }

        return this.dragData.metadata;
    }

    /**
     * Gets indication whether component can accept drop
     */
    public get canDrop(): boolean
    {
        return this.manager.getComponent(this.metadata.id)?.canDrop ?? false;
    }

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
     * Element that represents placeholder preview
     */
    protected placeholderPreviewElement: HTMLElement|undefined|null;

    /**
     * Drop zone target that handles drop of component
     */
    protected placeholderDrop: DropTarget<LayoutDragItem, LayoutDropResult> = this.dnd.dropTarget(['TREE_COMPONENT'],
                                                                                                  {
                                                                                                      canDrop: () => true,
                                                                                                      drop: monitor =>
                                                                                                      {
                                                                                                          const item = monitor.getItem();
                                                                                                          let index = this.bus.dropPlaceholderPreviewIndex;
                                                                                                  
                                                                                                          if(item && isPresent(item.dragData.index) && isPresent(index))
                                                                                                          {
                                                                                                              //same parent and higher index
                                                                                                              if(index > item.dragData.index)
                                                                                                              {
                                                                                                                  index--;
                                                                                                              }
                                                                                                          }

                                                                                                          return <LayoutDropResult>{
                                                                                                              index,
                                                                                                              id: this.metadata?.id,
                                                                                                          };
                                                                                                      },
                                                                                                  }, this.initSubscriptions);

    /**
     * Drop zone target that handles drop of component
     */
    protected containerDrop: DropTarget<LayoutDragItem, LayoutDropResult> = this.dnd.dropTarget(['TREE_COMPONENT'],
                                                                                                {
                                                                                                    canDrop: monitor => this.canDropAncestors(this.metadata.id, monitor.getItem()?.dragData.metadata?.id)[0] && monitor.isOver({shallow: true}),
                                                                                                    drop: monitor =>
                                                                                                    {
                                                                                                        const [index, id] = this.getFixedDropCoordinates(monitor, false);

                                                                                                        return <LayoutDropResult>{
                                                                                                            index,
                                                                                                            id,
                                                                                                        };
                                                                                                    },
                                                                                                    hover: monitor =>
                                                                                                    {
                                                                                                        if(monitor.isOver({shallow: true}))
                                                                                                        {
                                                                                                            const [index, parentId] = this.getDropCoordinates(monitor, false);

                                                                                                            if(isBlank(index) || isBlank(parentId))
                                                                                                            {
                                                                                                                return;
                                                                                                            }

                                                                                                            this.bus.setDropPlaceholderPreview(
                                                                                                            {
                                                                                                                index,
                                                                                                                parentId,
                                                                                                                placeholder:
                                                                                                                {
                                                                                                                    height: 0,
                                                                                                                    width: 0
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                    }
                                                                                                }, this.initSubscriptions);

    //######################### public properties #########################

    /**
     * Drag source used for dragging component
     */
    public drag: DragSource<LayoutDragItem, LayoutDropResult> = this.dnd.dragSource('TREE_COMPONENT',
                                                                                    {
                                                                                        beginDrag: () =>
                                                                                        {
                                                                                            this.draggingSvc.setDragging(true);
                                                                                            this.designerElement.nativeElement.classList.add('is-dragged');

                                                                                            return {
                                                                                                dragData: this.dragData,
                                                                                            };
                                                                                        },
                                                                                        canDrag: () => !this.dragDisabled,
                                                                                        endDrag: monitor =>
                                                                                        {
                                                                                            this.designerElement.nativeElement.classList.remove('is-dragged');

                                                                                            //dropped outside of any dropzone
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
                                                                                            }

                                                                                            this.bus.setDropPlaceholderPreview(null);
                                                                                            this.draggingSvc.setDragging(false);
                                                                                        },
                                                                                    },
                                                                                    this.initSubscriptions);

    /**
     * Drop zone target that handles drop of component
     */
    public dropzone: DropTarget<LayoutDragItem, LayoutDropResult> = this.dnd.dropTarget(['TREE_COMPONENT'],
                                                                                        {
                                                                                            canDrop: monitor => 
                                                                                            {
                                                                                                return ((this.canDrop && !this.hasAncestor(this.metadata.id, monitor.getItem()?.dragData.metadata?.id)) || this.canDropAncestors(this.metadata.id, monitor.getItem()?.dragData.metadata?.id)[0]) && monitor.isOver({shallow: true});
                                                                                            },
                                                                                            drop: monitor =>
                                                                                            {
                                                                                                const [index, id] = this.getFixedDropCoordinates(monitor, this.canDrop);

                                                                                                return <LayoutDropResult>{
                                                                                                    index,
                                                                                                    id
                                                                                                };
                                                                                            },
                                                                                            hover: monitor =>
                                                                                            {
                                                                                                if(monitor.isOver({shallow: true}))
                                                                                                {
                                                                                                    this._manager.dragOverComponent(this.metadata.id);

                                                                                                    if (monitor.canDrop())
                                                                                                    {
                                                                                                        const [index, parentId] = this.getDropCoordinates(monitor, this.canDrop);

                                                                                                        if(isBlank(index) || isBlank(parentId))
                                                                                                        {
                                                                                                            return;
                                                                                                        }

                                                                                                        this.bus.setDropPlaceholderPreview(
                                                                                                        {
                                                                                                            index,
                                                                                                            parentId,
                                                                                                            placeholder:
                                                                                                            {
                                                                                                                height: 0,
                                                                                                                width: 0
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }, this.initSubscriptions);

    //######################### public properties - inputs #########################

    /**
     * Html element that represents dropzone
     */
    @Input()
    public dropzoneElement!: HTMLElement;

    /**
     * Html element that represents children container
     */
    @Input()
    public containerElement!: HTMLElement;

    /**
     * Instance of drag data for this component
     */
    @Input('dndCoreTreeItem')
    public dragData!: LayoutComponentDragData;

    /**
     * Indication whether is drag disabled
     */
    @Input()
    public dragDisabled: boolean = false;

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
                protected injector: Injector,
                protected _manager: LayoutEditorMetadataManager,
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

        if(!this.containerElement)
        {
            throw new Error('DndCoreDesignerDirective: missing container element!');
        }

        if(!this.dragData)
        {
            throw new Error('DndCoreDesignerDirective: missing drag data!');
        }

        this.initSubscriptions.add(this.bus
                                        .dropDataChange
                                        .pipe(filter(itm => itm.id === this.metadata.id))
                                        .subscribe(itm => 
                                        {
                                            this.ngZone.run(() => this.dropMetadata.emit(itm.data));
                                        }));
 
        this.initSubscriptions.add(this.bus
                                        .oldDropPlaceholderPreviewChange
                                        .pipe(filter(itm => itm.parentId === this.metadata.id))
                                        .subscribe(() =>
                                        {
                                            this.ngZone.run(() =>
                                            {
                                                this.placeholderPreviewElement?.remove();
                                                this.placeholderPreviewElement = null;
                                            });
                                        }));
 
        this.initSubscriptions.add(this.bus
                                        .newDropPlaceholderPreviewChange
                                        .pipe(filter(itm => itm.parentId === this.metadata.id))
                                        .subscribe((preview) =>
                                        {
                                            this.ngZone.run(() => this.showPlaceholderPreview(preview));
                                        }));
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
     * Gets drop coordinates
     * @param monitor - Monitor containing information about current drag drop state
     * @param canDrop - Indication whether can drop can occur on monitor itself
     */
    protected getDropCoordinates(monitor: DropTargetMonitor<LayoutDragItem, LayoutDropResult>, canDrop: boolean): [number|null, string|null]
    {
        //can drop in itself// for now drop at index 0
        if(canDrop)
        {
            return this.getDropCoordinatesForChildren(monitor);
        }

        //else get index from descendant
        const [canDropAncestor, ancestorId, id] = this.canDropAncestors(this.metadata.id, monitor.getItem()?.dragData.metadata?.id);
        
        //this should not happen
        if(!canDropAncestor || isBlank(ancestorId))
        {
            return [null, null];
        }

        const parentComponent = this.manager.getComponent(ancestorId);
        const componentIndex = this.manager.getComponent(id)?.index ?? 0;
        const item = monitor.getItem();

        if(item && isPresent(item.dragData.index))
        {
            //is over itself
            if(item.dragData.metadata?.id === this.metadata.id)
            {
                return [item.dragData.index, item.dragData.parentId ?? ''];
            }
        }

        if(!parentComponent)
        {
            return [null, null];
        }

        return [componentIndex + this.getIndexIncrement(monitor), ancestorId];
    }

    /**
     * Gets coordinates calculated for children of this component
     * @param monitor - Monitor containing information about current drag drop state
     */
    protected getDropCoordinatesForChildren(monitor: DropTargetMonitor<LayoutDragItem, LayoutDropResult>): [number|null, string|null]
    {
        const getHalf = (element: Element) =>
        {
            const rect = element.children[0]?.getBoundingClientRect();
            const position = rect?.y;
            const half = rect?.height / 2;
            
            return position + half;
        };

        if(!this.containerElement)
        {
            return [null, null];
        }

        let index = 0;
        const offset = monitor.getClientOffset();
        
        if(!offset)
        {
            return [null, null];
        }

        const position = offset.y;

        for(let x = 0; x < this.containerElement.children.length; x++)
        {
            const child = this.containerElement.children[x];

            //do nothing for placeholder
            if(child.classList.contains('drag-placeholder'))
            {
                continue;
            }

            //return index if less than half
            if(position <= getHalf(child))
            {
                return [index, this.metadata.id];
            }

            index++;
        }

        return [index, this.metadata.id];
    }

    /**
     * Gets fixed drop coordinates
     * @param monitor - Monitor containing information about current drag drop state
     * @param canDrop - Indication whether can drop can occur on monitor itself
     */
    protected getFixedDropCoordinates(monitor: DropTargetMonitor<LayoutDragItem, LayoutDropResult>, canDrop: boolean): [number|null, string|null]
    {
        const [index, id] = this.getDropCoordinates(monitor, canDrop);
        let usedIndex = index;
        const item = monitor.getItem();

        if(item && isPresent(usedIndex) && isPresent(item.dragData.index))
        {
            //same parent and higher index
            if(id === item.dragData.parentId &&
                usedIndex > item.dragData.index)
            {
                usedIndex--;
            }
        }

        return [usedIndex, id];
    }

    /**
     * Gets index increment
     * @param monitor - Monitor to be used for obtaining information about index
     * @param horizontal - Indication whether are items horizontaly oriented
     */
    protected getIndexIncrement(monitor: DropTargetMonitor<LayoutDragItem, LayoutDropResult>): number
    {
        const rect = this.dropzoneElement.getBoundingClientRect();
        const offset = monitor.getClientOffset();

        if(!offset)
        {
            return 0;
        }

        const position = offset.y - rect.y;
        const half = rect.height / 2;

        if(position <= half)
        {
            return 0;
        }
        else
        {
            return 1;
        }
    }

    /**
     * Shows placeholder preview at specified location
     * @param preview - Instance of preview data
     */
    @BindThis
    protected showPlaceholderPreview(preview: DropPlaceholderPreview): void
    {
        if(!this.containerElement)
        {
            return;
        }

        this.placeholderPreviewElement ??= this.document.createElement('div');
        this.placeholderPreviewElement.classList.add('drag-placeholder');
        this.placeholderPreviewElement.remove();

        this.connectDropToPlaceholder();
        this.containerElement.insertBefore(this.placeholderPreviewElement, this.containerElement.children[preview.index]);
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

    /**
     * Gets indication whether any of ancestors can accept drop, also returns id of that ancestor
     * @param id - Id of component whose parent will be tested, if not specified id of this component will be used
     */
    protected canDropAncestors(id?: string, ancestorId?: string): [boolean, string|null, string]
    {
        if(isBlank(id))
        {
            id = this.metadata.id;
        }

        const component = this.manager.getComponentDef(id);


        if(!component?.parent ||
            isPresent(ancestorId) && this.hasAncestor(component.component.id, ancestorId))
        {
            return [false, null, id];
        }

        if(component.parent.component.canDrop)
        {
            return [true, component.parent.component.id, id];
        }
        else
        {
            return this.canDropAncestors(component.parent.component.id, ancestorId);
        }
    }

    /**
     * Checks whether component has ancestor with specified identifier
     * @param component component to check
     * @param ancestorId ancestor identifier to find
     * @returns 
     */
    protected hasAncestor(id: string, ancestorId?: string): boolean
    {
        if (!ancestorId)
        {
            return false;
        }

        const component = this.manager.getComponentDef(id);

        if (component?.component?.id === ancestorId)
        {
            return true;
        }

        if (component?.parent)
        {
            return this.hasAncestor(component.parent.component?.id, ancestorId);
        }

        return false;
    }
}