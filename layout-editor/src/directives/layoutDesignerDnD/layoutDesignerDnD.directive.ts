import {Directive, inject, OnDestroy} from '@angular/core';
import {isBlank, isPresent} from '@jscrpt/common';
import {DndService, DragSource, DropTarget, DropTargetMonitor} from '@ng-dnd/core';
import {Subscription} from 'rxjs';

import {DragActiveService, LayoutEditorMetadataManagerComponent} from '../../services';
import {DndBusService} from '../../modules/layoutDndCore/services/dndBus/dndBus.service';
import {PlaceholderRenderer} from '../../modules/layoutDndCore/services/placeholderRenderer/placeholderRenderer.service';
import {LayoutDragItem, LayoutDropResult} from '../../modules/layoutDndCore/directives/dndCoreDesigner/dndCoreDesigner.interface';
import {LayoutDesignerCommonDirective} from '../layoutDesignerCommon/layoutDesignerCommon.directive';
import {DropPlaceholderPreview} from '../../modules/layoutDndCore/services/dndBus/dndBus.interface';

//TODO: move services into services and break apart DnD module

const DEFAULT_DROP_TYPES = ['COMPONENT', 'METADATA'];
const DEFAULT_DRAG_TYPE = 'COMPONENT';

/**
 * Directive used for handling drag n drop
 */
@Directive(
{
    selector: '[layoutDesignerDnD]',
    standalone: true,
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
     * Drop zone target for dropping over displayed placeholder, drops at exact location of placeholder
     */
    protected ɵplaceholderDrop: DropTarget<LayoutDragItem, LayoutDropResult>|undefined|null;

    /**
     * Drop zone target for dropping over itself
     */
    protected ɵcontainerDrop: DropTarget<LayoutDragItem, LayoutDropResult>|undefined|null;

    /**
     * Instance of common designer directive storing common stuff
     */
    protected common: LayoutDesignerCommonDirective = inject(LayoutDesignerCommonDirective);
    
    /**
     * Service used for communication with dnd
     */
    protected dnd: DndService = inject(DndService);

    /**
     * Service used for obtaining information that 'drag' is active
     */
    protected draggingSvc: DragActiveService = inject(DragActiveService);

    /**
     * Service used for sharing data during drag n drop
     */
    protected bus: DndBusService = inject(DndBusService);

    /**
     * Service used for rendering placeholder
     */
    protected placeholderRenderer: PlaceholderRenderer = inject(PlaceholderRenderer);

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

    /**
     * Drop zone target for dropping over displayed placeholder, drops at exact location of placeholder
     */
    protected get placeholderDrop(): DropTarget<LayoutDragItem, LayoutDropResult>
    {
        if(!this.ɵplaceholderDrop)
        {
            throw new Error('LayoutDesignerDnDDirective: missing placeholder drop!');
        }

        return this.ɵplaceholderDrop;
    }

    /**
     * Drop zone target for dropping over itself
     */
    protected get containerDrop(): DropTarget<LayoutDragItem, LayoutDropResult>
    {
        if(!this.ɵcontainerDrop)
        {
            throw new Error('LayoutDesignerDnDDirective: missing container drop!');
        }

        return this.ɵcontainerDrop;
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
        this.ɵplaceholderDrop = this.dnd.dropTarget(DEFAULT_DROP_TYPES,
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
                                                                id: this.common.designer.metadataSafe.id,
                                                            };
                                                        },
                                                    }, this.initSubscriptions);

        this.ɵcontainerDrop = this.dnd.dropTarget(DEFAULT_DROP_TYPES,
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

        this.ɵdrag = this.dnd.dragSource(DEFAULT_DRAG_TYPE,
                                         {
                                             beginDrag: () =>
                                             {
                                                 this.draggingSvc.setDragging(true);
                                                 this.common.element.nativeElement.classList.add('is-dragged');

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
                                                     this.common.element.nativeElement.classList.remove('is-dragged');
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
                                                 this.common.element.nativeElement.classList.remove('is-dragged');
                                             },
                                         },
                                         this.initSubscriptions);

        this.ɵdropzone = this.dnd.dropTarget(DEFAULT_DROP_TYPES,
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

        const parentComponent = this.common.layoutEditorManager.getComponent(ancestorId);
        const componentIndex = this.common.layoutEditorManager.getComponent(id)?.index ?? 0;
        const item = monitor.getItem();

        if(item && isPresent(item.dragData.index))
        {
            //is over itself
            if(item.dragData.metadata?.id === this.common.designer.metadataSafe.id)
            {
                return [item.dragData.index, item.dragData.parentId ?? ''];
            }
        }

        if(!parentComponent)
        {
            return [null, null];
        }

        return [componentIndex + parentComponent.dnd.getIndexIncrement(monitor, parentComponent.editorMetadata.horizontal), ancestorId];
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
            const position = this.common.editorMetadata.horizontal ? rect.x : rect.y;
            const half = (this.common.editorMetadata.horizontal ? rect.width : rect.height) / 2;

            return position + half;
        };

        let index = 0;
        const offset = monitor.getClientOffset();

        if(!offset)
        {
            return [null, null];
        }

        const position = this.common.editorMetadata.horizontal ? offset.x : offset.y;

        for(let x = 0; x < this.common.element.nativeElement.children.length; x++)
        {
            const child = this.common.element.nativeElement.children[x];

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
     */
    protected getIndexIncrement(monitor: DropTargetMonitor<LayoutDragItem, LayoutDropResult>, horizontal: boolean): number
    {
        const rect = this.common.element.nativeElement.getBoundingClientRect();
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
        this.placeholderRenderer.renderPlaceholder(this.common.element.nativeElement, preview.index, this.placeholderDrop, this.common.editorMetadata.horizontal);
    }

    // /**
    //  * Connects container element to container drop
    //  */
    // protected connectDropToContainer(): void
    // {
    //     this.ngZone.runOutsideAngular(() =>
    //     {
    //         this.containerConnection?.unsubscribe();
    //         this.containerConnection = this.containerDrop.connectDropTarget(this.designerElement.nativeElement);
    //     });
    // }

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