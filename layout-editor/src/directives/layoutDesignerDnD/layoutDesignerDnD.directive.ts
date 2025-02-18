import {Directive, effect, inject, NgZone, OnDestroy} from '@angular/core';
import {isBlank, isPresent} from '@jscrpt/common';
import {DndService, DragSource, DropTarget, DropTargetMonitor} from '@ng-dnd/core';
import {filter, Subscription} from 'rxjs';

import {DropPlaceholderPreview, LayoutEditorMetadataManagerComponent, PlaceholderRenderer} from '../../services';
import {LayoutDesignerCommonDirective} from '../layoutDesignerCommon/layoutDesignerCommon.directive';
import {LayoutDragItem, LayoutDropResult} from '../../interfaces';

const DEFAULT_DROP_TYPES = ['COMPONENT', 'METADATA'];
const DEFAULT_DRAG_TYPE = 'COMPONENT';

let emptyImage: HTMLImageElement;

/**
 * Returns a 0x0 empty GIF for use as a drag preview.
 */
function getEmptyImage()
{
    if (!emptyImage)
    {
        emptyImage = new Image();
        emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    }

    return emptyImage;
  }

/**
 * Directive used for handling drag n drop
 */
@Directive(
{
    selector: '[layoutDesignerDnD]',
})
export class LayoutDesignerDnDDirective implements OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Drag source used for dragging component
     */
    protected ɵdrag: DragSource<LayoutDragItem, LayoutDropResult>|undefined|null;

    /**
     * Drop zone target that handles drop of component
     */
    protected ɵdropzone: DropTarget<LayoutDragItem, LayoutDropResult>|undefined|null;

    /**
     * Instance of common designer directive storing common stuff
     */
    protected common: LayoutDesignerCommonDirective = inject(LayoutDesignerCommonDirective);

    /**
     * Service used for communication with dnd
     */
    protected dnd: DndService = inject(DndService);

    /**
     * Service used for rendering placeholder
     */
    protected placeholderRenderer: PlaceholderRenderer = inject(PlaceholderRenderer);

    /**
     * Instance of angular Zone
     */
    protected ngZone: NgZone = inject(NgZone);

    //######################### protected properties #########################

    /**
     * Gets instance of element that belongs to this designer
     */
    protected get element(): Element
    {
        return this.common.element.nativeElement;
    }

    /**
     * Gets element that represents container that contains children
     */
    protected get containerElement(): Element
    {
        if(!this.common.editorMetadata.metadata?.getChildrenContainer)
        {
            return this.element;
        }

        return this.common.editorMetadata.metadata?.getChildrenContainer(this.element) ?? this.element;
    }

    //######################### constructor #########################
    constructor()
    {
        effect(() =>
        {
            if(!this.common.draggingSvc.dragging())
            {
                this.common.dndBus.setDragOverComponentId(null);
                this.common.dndBus.setDragOverContainerId(null);
            }
        }, {allowSignalWrites: true});

        effect(() =>
        {
            if(this.common.draggingSvc.dragging() && this.common.editorMetadata.canDrop)
            {
                this.element.classList.add('drag-active');
            }
            else
            {
                this.element.classList.remove('drag-active');
            }
        });
    }

    //######################### protected properties #########################

    /**
     * Drag source used for dragging component
     */
    protected get drag(): DragSource<LayoutDragItem, LayoutDropResult>
    {
        if(!this.ɵdrag)
        {
            throw new Error('LayoutDesignerDnDDirective: missing drag source!');
        }

        return this.ɵdrag;
    }

    /**
     * Drop zone target that handles drop of component
     */
    protected get dropzone(): DropTarget<LayoutDragItem, LayoutDropResult>
    {
        if(!this.ɵdropzone)
        {
            throw new Error('LayoutDesignerDnDDirective: missing drop zone!');
        }

        return this.ɵdropzone;
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * @inheritdoc
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();
    }

    //######################### public methods #########################

    /**
     * Initialize dnd for component
     */
    public initalize(): void
    {
        const dropTypes = this.common.editorMetadata.metadata?.customDropTypes?.().layout ?? DEFAULT_DROP_TYPES;
        const dragTypes = this.common.editorMetadata.metadata?.customDragType?.().layout ?? DEFAULT_DRAG_TYPE;

        this.initSubscriptions.add(this.common.dndBus
            .dropDataChange
            .pipe(filter(itm => itm.id === this.common.designer.metadataSafe.id))
            .subscribe(itm => this.common.designer.addDescendant(itm.data)));

        //create placeholder in this component
        this.initSubscriptions.add(this.common.dndBus
            .newDropPlaceholderPreviewChange
            .pipe(filter(itm => itm.parentId === this.common.designer.metadataSafe.id))
            .subscribe(preview => this.showPlaceholderPreview(preview)));

        this.ɵdrag = this.dnd.dragSource(dragTypes,
                                         {
                                             beginDrag: () =>
                                             {
                                                 this.common.draggingSvc.setDragging(true);
                                                 this.element.classList.add('is-dragged');

                                                 return {
                                                     dragData:
                                                     {
                                                         metadata: this.common.designer.metadataSafe,
                                                         parentId: this.common.designer.parent?.metadataSafe.id,
                                                         index: this.common.designer.index,
                                                     },
                                                 };
                                             },
                                             canDrag: () => !this.common.designer.dragDisabled,
                                             endDrag: monitor =>
                                             {
                                                 //dropped outside of any dropzone
                                                 if(!monitor.didDrop())
                                                 {
                                                     this.element.classList.remove('is-dragged');
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

                                                     this.common.dndBus.setDropData(
                                                     {
                                                         data: item.dragData,
                                                         id: dropResult.id,
                                                     });
                                                 }

                                                 this.common.dndBus.setDropPlaceholderPreview(null);
                                                 this.common.draggingSvc.setDragging(false);
                                                 this.element.classList.remove('is-dragged');
                                             },
                                         },
                                         this.initSubscriptions);

        this.ɵdropzone = this.dnd.dropTarget(dropTypes,
                                             {
                                                 canDrop: monitor => (this.common.editorMetadata.canDrop || this.canDropAncestors(monitor)[0]) && monitor.isOver({shallow: true}) && this.selfIsAncestor(monitor),
                                                 drop: monitor =>
                                                 {
                                                     const [index, id] = this.getFixedDropCoordinates(monitor, this.common.editorMetadata.canDrop);

                                                     return <LayoutDropResult>{
                                                         index,
                                                         id
                                                     };
                                                 },
                                                 hover: monitor =>
                                                 {
                                                     if(monitor.isOver({shallow: true}) && monitor.canDrop())
                                                     {
                                                         const [index, parentId] = this.getDropCoordinates(monitor, this.common.editorMetadata.canDrop);

                                                         this.common.dndBus.setDragOverContainerId(parentId);

                                                         if(isBlank(index) || isBlank(parentId))
                                                         {
                                                             return;
                                                         }

                                                         this.common.dndBus.setDropPlaceholderPreview(
                                                         {
                                                             index,
                                                             parentId,
                                                         });
                                                     }
                                                 }
                                             }, this.initSubscriptions);

        this.connectDragSource();
        this.connectDropTarget();
    }

    //######################### protected methods #########################

    /**
     * Connects drag element to drag source
     */
    protected connectDragSource(): void
    {
        this.ngZone.runOutsideAngular(() =>
        {
            this.initSubscriptions.add(this.drag.connectDragSource(this.element));
            this.initSubscriptions.add(this.drag.connectDragPreview(getEmptyImage()));
        });
    }

    /**
     * Connects dropzone element to drop target
     */
    protected connectDropTarget(): void
    {
        this.ngZone.runOutsideAngular(() =>
        {
            this.initSubscriptions.add(this.dropzone.connectDropTarget(this.element));
        });
    }

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
            this.common.dndBus.setDragOverComponentId(null);

            return this.getDropCoordinatesForChildren(monitor);
        }

        //else get index from descendant
        const [canDropAncestor, ancestorId, id] = this.canDropAncestors(monitor);

        //this should not happen
        if(!canDropAncestor || isBlank(ancestorId))
        {
            return [null, null];
        }

        const parentComponent = this.common.layoutEditorManager.getComponent(ancestorId);
        const component = this.common.layoutEditorManager.getComponent(id);
        const componentIndex = component?.index ?? 0;
        const item = monitor.getItem();
        this.common.dndBus.setDragOverComponentId(id);

        if(item && isPresent(item.dragData.index))
        {
            //is over itself
            if(item.dragData.metadata?.id === this.common.designer.metadataSafe.id)
            {
                if(!item.dragData.parentId)
                {
                    throw new Error('LayoutDesignerDnDDirective: missing parent!');
                }

                return [item.dragData.index, item.dragData.parentId];
            }
        }

        if(!component)
        {
            throw new Error('LayoutDesignerDnDDirective: missing drag over component!');
        }

        if(!parentComponent)
        {
            return [null, null];
        }

        return [componentIndex + parentComponent.dnd.getIndexIncrement(monitor, parentComponent.editorMetadata.horizontal, component.dnd.element), ancestorId];
    }

    /**
     * Gets coordinates calculated for children of this component
     * @param monitor - Monitor containing information about current drag drop state
     */
    protected getDropCoordinatesForChildren(monitor: DropTargetMonitor<LayoutDragItem, LayoutDropResult>): [number|null, string|null]
    {
        const getHalf = (element: Element) =>
        {
            const horizontal = this.common.editorMetadata.horizontal;
            const rect = element.getBoundingClientRect();
            const computedStyles = getComputedStyle(element);
            const marginOffset = horizontal ? (+computedStyles.marginLeft.replace('px', '')) : (+computedStyles.marginTop.replace('px', ''));
            const margin = horizontal ? ((+computedStyles.marginLeft.replace('px', '')) + (+computedStyles.marginRight.replace('px', ''))) : ((+computedStyles.marginTop.replace('px', '')) + (+computedStyles.marginBottom.replace('px', '')));
            const position = (horizontal ? rect.x : rect.y) - marginOffset;
            const half = ((horizontal ? rect.width : rect.height) + margin) / 2;

            return position + half;
        };

        let index = 0;
        const offset = monitor.getClientOffset();

        if(!offset)
        {
            return [null, null];
        }

        const position = this.common.editorMetadata.horizontal ? offset.x : offset.y;

        for(let x = 0; x < this.containerElement.children.length; x++)
        {
            const child = this.containerElement.children[x];

            //return index if less than half
            if(position <= getHalf(child))
            {
                return [index, this.common.designer.metadataSafe.id];
            }

            index++;
        }

        return [index, this.common.designer.metadataSafe.id];
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
     * @param element - Element whose index increment will be calculated
     */
    protected getIndexIncrement(monitor: DropTargetMonitor<LayoutDragItem, LayoutDropResult>, horizontal: boolean, element: Element): number
    {
        const rect = element.getBoundingClientRect();
        const offset = monitor.getClientOffset();

        if(!offset)
        {
            return 0;
        }
        
        const computedStyles = getComputedStyle(element);
        const marginOffset = horizontal ? (+computedStyles.marginLeft.replace('px', '')) : (+computedStyles.marginTop.replace('px', ''));
        const margin = horizontal ? ((+computedStyles.marginLeft.replace('px', '')) + (+computedStyles.marginRight.replace('px', ''))) : ((+computedStyles.marginTop.replace('px', '')) + (+computedStyles.marginBottom.replace('px', '')));
        const position = (horizontal ? offset.x - rect.x : offset.y - rect.y) + marginOffset;
        const half = horizontal ? (rect.width + margin) / 2 : (rect.height + margin) / 2;

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
        this.placeholderRenderer.renderPlaceholder(this.containerElement, preview.index, this.common.editorMetadata.horizontal);
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
            throw new Error('LayoutDesignerDnDDirective: missing drag metadata!');
        }

        let componentDef: LayoutEditorMetadataManagerComponent|undefined|null = this.common.layoutEditorManager.getComponentDef(this.common.designer.metadataSafe.id);

        do
        {
            if(componentDef?.component.metadataSafe.id == metadata.id)
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
            id = this.common.designer.metadataSafe.id;
        }

        const component = this.common.layoutEditorManager.getComponentDef(id);

        //no more parents
        if(!component?.parent)
        {
            return [false, null, id];
        }

        const customDropTypes = component.parent.component.editorMetadata.metadata?.customDropTypes?.().layout;

        const dragType = monitor.getItemType() as string;
        const dropTypes = customDropTypes
            ? Array.isArray(customDropTypes)
                ? customDropTypes
                : [customDropTypes]
            : DEFAULT_DROP_TYPES;

        //parent can accept drop and can accept same drop type
        if(component.parent.component.editorMetadata.canDrop &&
           dropTypes.indexOf(dragType) >= 0)
        {
            return [true, component.parent.component.metadataSafe.id, id];
        }
        else
        {
            return this.canDropAncestors(monitor, component.parent.component.metadataSafe.id);
        }
    }
}