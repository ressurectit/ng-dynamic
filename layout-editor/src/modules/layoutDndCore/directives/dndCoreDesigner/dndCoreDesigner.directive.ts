import {ContentChild, Directive, ElementRef, EventEmitter, ExistingProvider, forwardRef, Inject, Injector, Input, NgZone, OnDestroy, OnInit, Output} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {LayoutComponentMetadata, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {BindThis, isBlank, isPresent} from '@jscrpt/common';
import {DndService, DragSource, DropTarget, DropTargetMonitor} from '@ng-dnd/core';
import {filter, Subscription} from 'rxjs';

import {LayoutComponentDragData} from '../../../../interfaces';
import {DragActiveService, LayoutEditorMetadataManager} from '../../../../services';
import {DndBusService, DropPlaceholderPreview} from '../../services';
import {LayoutDragItem, LayoutDropResult} from './dndCoreDesigner.interface';
import {DragPreviewRegistrator} from '../../interfaces';
import {DRAG_PREVIEW_REGISTRATOR} from '../../misc/tokens';
// import {registerDropzoneOverlay} from '../../misc/utils';

//TODO: go over all items up to find out whether can be dropped

/**
 * Directive used for initializing and handling dnd core functionality for layout designer
 */
@Directive(
{
    selector: '[dndCoreDesigner]',
    exportAs: 'dndCoreDesigner',
    providers:
    [
        <ExistingProvider>
        {
            provide: DRAG_PREVIEW_REGISTRATOR,
            useExisting: forwardRef(() => DndCoreDesignerDirective),
        }
    ]
})
export class DndCoreDesignerDirective implements OnInit, OnDestroy, DragPreviewRegistrator
{
    //######################### protected properties #########################

    /**
     * Current metadata for this component
     */
    protected get metadata(): LayoutComponentMetadata
    {
        if(!this.dragData.metadata)
        {
            throw new Error('DndCoreDesignerDirective: invalid drag data without metadata!');
        }

        return this.dragData.metadata;
    }

    /**
     * Gets indication whether component can accept drop
     */
    protected get canDrop(): boolean
    {
        return this.manager.getComponent(this.metadata.id)?.canDrop ?? false;
    }

    /**
     * Gets indication whether component children flow is horizontal
     */
    protected get horizontal(): boolean
    {
        return this.manager.getComponent(this.metadata.id)?.horizontal ?? false;
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
                                                                                                              id: this.metadata?.id,
                                                                                                          };
                                                                                                      },
                                                                                                  }, this.initSubscriptions);

    /**
     * Drop zone target that handles drop of component
     */
    protected containerDrop: DropTarget<LayoutDragItem, LayoutDropResult> = this.dnd.dropTarget(['COMPONENT', 'METADATA'],
                                                                                                {
                                                                                                    canDrop: monitor => this.canDropAncestors()[0] && monitor.isOver({shallow: true}),
                                                                                                    drop: monitor =>
                                                                                                    {
                                                                                                        const [index, id] = this.getDropCoordinates(monitor, false);

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
                                                                                            this.draggingSvc.setDragging(true);
                                                                                            this.designerElement.nativeElement.classList.add('is-dragged');

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
                                                                                                this.designerElement.nativeElement.classList.remove('is-dragged');
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
                                                                                            canDrop: monitor => (this.canDrop || this.canDropAncestors()[0]) && monitor.isOver({shallow: true}),
                                                                                            drop: monitor =>
                                                                                            {
                                                                                                const [index, id] = this.getDropCoordinates(monitor, this.canDrop);

                                                                                                return <LayoutDropResult>{
                                                                                                    index,
                                                                                                    id
                                                                                                };
                                                                                            },
                                                                                            hover: monitor =>
                                                                                            {
                                                                                                if(monitor.isOver({shallow: true}) && monitor.canDrop())
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
                                                                                        }, this.initSubscriptions);

    //######################### public properties - inputs #########################

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


        this.initSubscriptions.add(this.layoutComponentRendererDirective?.componentElementChange.subscribe(element =>
        {
            if(!element)
            {
                this.componentElement = null;

                return;
            }

            this.componentElement = element;
        }));

        this.initSubscriptions.add(this.bus
                                       .dropDataChange
                                       .pipe(filter(itm => itm.id === this.metadata.id))
                                       .subscribe(itm => this.dropMetadata.emit(itm.data)));

        this.initSubscriptions.add(this.bus
                                       .oldDropPlaceholderPreviewChange
                                       .pipe(filter(itm => itm.parentId === this.metadata.id))
                                       .subscribe(() =>
                                       {
                                           this.placeholderPreviewElement?.remove();
                                           this.placeholderPreviewElement = null;
                                       }));

        this.initSubscriptions.add(this.bus
                                       .newDropPlaceholderPreviewChange
                                       .pipe(filter(itm => itm.parentId === this.metadata.id))
                                       .subscribe(this.showPlaceholderPreview));

        // this.initSubscriptions.add(registerDropzoneOverlay(this.dropzone, this.dropzoneElement, this.injector, this.dragData));
        // this.initSubscriptions.add(registerDropzoneOverlay(this.containerDrop, this.designerElement.nativeElement, this.injector, this.dragData));
        // this.initSubscriptions.add(registerDropzoneOverlay(this.containerDrop, this.designerElement.nativeElement, this.injector, this.dragData));
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

    //######################### public methods - implementation of DragPreviewRegistrator #########################

    /**
     * @inheritdoc
     */
    public registerPreviewElement(element: HTMLElement): Subscription
    {
        return this.drag.connectDragPreview(element, {offsetX: 0, offsetY: 0});
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
        const [canDropAncestor, ancestorId, id] = this.canDropAncestors();
        
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

        return [componentIndex + this.getIndexIncrement(monitor, parentComponent.horizontal), ancestorId];
    }

    /**
     * Gets coordinates calculated for children of this component
     * @param monitor - Monitor containing information about current drag drop state
     */
    protected getDropCoordinatesForChildren(monitor: DropTargetMonitor<LayoutDragItem, LayoutDropResult>): [number|null, string|null]
    {
        const getHalf = (element: Element) =>
        {
            const rect = element.children[0].getBoundingClientRect();
            const position = this.horizontal ? rect.x : rect.y;
            const half = (this.horizontal ? rect.width : rect.height) / 2;
            
            return position + half;
        };

        if(!this.componentElement)
        {
            return [null, null];
        }

        let index = 0;
        const offset = monitor.getClientOffset();
        
        if(!offset)
        {
            return [null, null];
        }

        const position = this.horizontal ? offset.x : offset.y;

        for(let x = 0; x < this.componentElement.children.length; x++)
        {
            const child = this.componentElement.children[x];

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
     * Gets index increment
     * @param monitor - Monitor to be used for obtaining information about index
     * @param horizontal - Indication whether are items horizontaly oriented
     */
    protected getIndexIncrement(monitor: DropTargetMonitor<LayoutDragItem, LayoutDropResult>, horizontal: boolean): number
    {
        const rect = this.dropzoneElement.getBoundingClientRect();
        const offset = monitor.getClientOffset();

        if(!offset)
        {
            return 0;
        }

        const position = horizontal ? offset.x - rect.x : offset.y - rect.y;
        const half = horizontal ? rect.width / 2 : rect.height / 2;

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
        if(!this.componentElement)
        {
            return;
        }

        this.placeholderPreviewElement ??= this.document.createElement('div');
        this.placeholderPreviewElement.style.border = '3px solid blue';
        this.placeholderPreviewElement.classList.add('drag-placeholder');
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

    /**
     * Gets indication whether any of ancestors can accept drop, also returns id of that ancestor
     * @param id - Id of component whose parent will be tested, if not specified id of this component will be used
     */
    protected canDropAncestors(id?: string): [boolean, string|null, string]
    {
        if(isBlank(id))
        {
            id = this.metadata.id;
        }

        const component = this.manager.getComponentDef(id);


        if(!component?.parent)
        {
            return [false, null, id];
        }

        if(component.parent.component.canDrop)
        {
            return [true, component.parent.component.id, id];
        }
        else
        {
            return this.canDropAncestors(component.parent.component.id);
        }
    }
}