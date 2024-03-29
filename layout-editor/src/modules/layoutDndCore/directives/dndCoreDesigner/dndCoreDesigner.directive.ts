import {Directive, ElementRef, EventEmitter, Injector, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, inject} from '@angular/core';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {getHostElement} from '@anglr/common';
import {BindThis, isBlank, isPresent, nameof} from '@jscrpt/common';
import {DndService, DragSource, DropTarget, DropTargetMonitor} from '@ng-dnd/core';
import {filter, Subscription} from 'rxjs';

import {LayoutComponentDragData} from '../../../../interfaces';
import {DragActiveService, LayoutEditorMetadataManager, LayoutEditorMetadataManagerComponent, LayoutEditorRendererItem} from '../../../../services';
import {DndBusService, DropPlaceholderPreview, PlaceholderRenderer} from '../../services';
import {LayoutDragItem, LayoutDropResult} from './dndCoreDesigner.interface';
// import {registerDropzoneOverlay} from '../../misc/utils';

const DEFAULT_DROP_TYPES = ['COMPONENT', 'METADATA'];
const DEFAULT_DRAG_TYPE = 'COMPONENT';

/**
 * Directive used for initializing and handling dnd core functionality for layout designer
 */
@Directive(
{
    selector: '[dndCoreDesigner]',
    exportAs: 'dndCoreDesigner',
})
export class DndCoreDesignerDirective implements OnInit, OnChanges, OnDestroy
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
     * Subscription for container connection to DOM
     */
    protected containerConnection: Subscription|undefined|null;

    /**
     * Current component element
     */
    protected componentElement: HTMLElement|undefined|null;

    /**
     * Drop zone target for dropping over displayed placeholder, drops at exact location of placeholder
     */
    protected placeholderDrop: DropTarget<LayoutDragItem, LayoutDropResult>;

    /**
     * Drop zone target for dropping over itself
     */
    protected containerDrop: DropTarget<LayoutDragItem, LayoutDropResult>;

    /**
     * Gets element that represents container that contains children
     */
    protected get containerElement(): Element|undefined|null
    {
        if(!this.componentElement)
        {
            return;
        }

        const component = this.manager.getComponent(this.metadata.id);

        if(!component?.editorMetadata?.getChildrenContainer)
        {
            return this.componentElement;
        }

        return component.editorMetadata.getChildrenContainer(this.componentElement) ?? this.componentElement;
    }

    //######################### public properties #########################

    /**
     * Drag source used for dragging component
     */
    public drag: DragSource<LayoutDragItem, LayoutDropResult>;

    /**
     * Drop zone target that handles drop of component
     */
    public dropzone: DropTarget<LayoutDragItem, LayoutDropResult>;

    //######################### public properties - inputs #########################

    /**
     * Html element that represents dropzone
     */
    @Input({required: true})
    public dropzoneElement!: HTMLElement;

    /**
     * Instance of drag data for this component
     */
    @Input({required: true, alias: 'dndCoreDesigner'})
    public dragData!: LayoutComponentDragData;

    /**
     * Indication whether is drag disabled
     */
    @Input({required: true})
    public dragDisabled: boolean = false;

    /**
     * Default drag type for dragging components
     */
    @Input({required: true})
    public customDragType: string|undefined|null;

    /**
     * Default drop type for droping components
     */
    @Input({required: true})
    public customDropTypes: string|string[]|undefined|null;

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
                protected injector: Injector,
                protected placeholderRenderer: PlaceholderRenderer,)
    {
        this.placeholderDrop = this.dnd.dropTarget(DEFAULT_DROP_TYPES,
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

        this.containerDrop = this.dnd.dropTarget(DEFAULT_DROP_TYPES,
                                                 {
                                                     canDrop: monitor => this.canDropAncestors(monitor)[0] && monitor.isOver({shallow: true}),
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
                                                             });
                                                         }
                                                     }
                                                 }, this.initSubscriptions);

        this.drag = this.dnd.dragSource(DEFAULT_DRAG_TYPE,
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
                                                this.designerElement.nativeElement.classList.remove('is-dragged');
                                            },
                                        },
                                        this.initSubscriptions);

        this.dropzone = this.dnd.dropTarget(DEFAULT_DROP_TYPES,
                                            {
                                                canDrop: monitor => (this.canDrop || this.canDropAncestors(monitor)[0]) && monitor.isOver({shallow: true}) && this.selfIsAncestor(monitor),
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
                                                        });
                                                    }
                                                }
                                            }, this.initSubscriptions);

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

        this.initSubscriptions.add(this.bus
                                       .dropDataChange
                                       .pipe(filter(itm => itm.id === this.metadata.id))
                                       .subscribe(itm =>
                                       {
                                           this.ngZone.run(() => this.dropMetadata.emit(itm.data));
                                       }));

        //create placeholder in this component
        this.initSubscriptions.add(this.bus
                                       .newDropPlaceholderPreviewChange
                                       .pipe(filter(itm => itm.parentId === this.metadata.id))
                                       .subscribe((preview) =>
                                       {
                                           this.ngZone.run(() => this.showPlaceholderPreview(preview));
                                       }));

        // this.initSubscriptions.add(registerDropzoneOverlay(this.dropzone, this.dropzoneElement, this.injector, this.dragData));
        // this.initSubscriptions.add(registerDropzoneOverlay(this.containerDrop, this.designerElement.nativeElement, this.injector, this.dragData));
        // this.initSubscriptions.add(registerDropzoneOverlay(this.containerDrop, this.designerElement.nativeElement, this.injector, this.dragData));
    }

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * @inheritdoc
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<DndCoreDesignerDirective>('customDragType') in changes)
        {
            if(!isBlank(this.customDragType))
            {
                this.drag.setType(this.customDragType);
            }
        }

        if(nameof<DndCoreDesignerDirective>('customDropTypes') in changes)
        {
            if(!isBlank(this.customDropTypes))
            {
                this.dropzone.setTypes(this.customDropTypes);
                this.placeholderDrop.setTypes(this.customDropTypes);
                this.containerDrop.setTypes(this.customDropTypes);
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

        this.containerConnection?.unsubscribe();
        this.containerConnection = null;

        this.drag.unsubscribe();
        this.dropzone.unsubscribe();
        this.placeholderDrop.unsubscribe();
        this.containerDrop.unsubscribe();
    }

    //######################### public methods #########################

    /**
     * Callback called when component was fully rendered
     * @param item - Item that contains information about rendered component
     */
    @BindThis
    public renderedComponentCallback(item: LayoutEditorRendererItem): void
    {
        this.componentElement = getHostElement(item.component);
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
        const [canDropAncestor, ancestorId, id] = this.canDropAncestors(monitor);

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

        return [componentIndex + parentComponent.dndCoreDesigner.getIndexIncrement(monitor, parentComponent.horizontal), ancestorId];
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

        const position = this.horizontal ? offset.x : offset.y;

        for(let x = 0; x < this.containerElement.children.length; x++)
        {
            const child = this.containerElement.children[x];

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
    protected showPlaceholderPreview(preview: DropPlaceholderPreview): void
    {
        if(!this.containerElement)
        {
            return;
        }

        this.placeholderRenderer.renderPlaceholder(this.containerElement, preview.index, this.placeholderDrop, this.horizontal);
    }

    /**
     * Connects container element to container drop
     */
    protected connectDropToContainer(): void
    {
        this.ngZone.runOutsideAngular(() =>
        {
            this.containerConnection?.unsubscribe();
            this.containerConnection = this.containerDrop.connectDropTarget(this.designerElement.nativeElement);
        });
    }

    /**
     * Tests whether dragged element is ancestor of drop target, prevents self inclusion
     * @param monitor - Drop target monitor with all information about drag and drop
     */
    protected selfIsAncestor(monitor: DropTargetMonitor<LayoutDragItem, LayoutDropResult>): boolean
    {
        const metadata = monitor.getItem()?.dragData.metadata;

        if(!metadata)
        {
            throw new Error('DndCoreDesignerDirective: missing drag metadata!');
        }

        let componentDef: LayoutEditorMetadataManagerComponent|undefined|null = this.manager.getComponentDef(this.metadata.id);

        do
        {
            if(componentDef?.component.id == metadata.id)
            {
                return false;
            }
        }
        while((componentDef = componentDef?.parent));

        return true;
    }

    /**
     * Gets indication whether any of ancestors can accept drop, also returns id of that ancestor
     * @param monitor - Monitor containing information about current drag drop state
     * @param id - Id of component whose parent will be tested, if not specified id of this component will be used
     */
    protected canDropAncestors(monitor: DropTargetMonitor<LayoutDragItem, LayoutDropResult>, id?: string): [boolean, string|null, string]
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

        const dragType = monitor.getItemType() as string;
        const dropTypes = component.parent.component.dndCoreDesigner.customDropTypes
            ? Array.isArray(component.parent.component.dndCoreDesigner.customDropTypes)
                ? component.parent.component.dndCoreDesigner.customDropTypes
                : [component.parent.component.dndCoreDesigner.customDropTypes]
            : DEFAULT_DROP_TYPES;

        if(component.parent.component.canDrop &&
           dropTypes.indexOf(dragType) >= 0)
        {
            return [true, component.parent.component.id, id];
        }
        else
        {
            return this.canDropAncestors(monitor, component.parent.component.id);
        }
    }
}