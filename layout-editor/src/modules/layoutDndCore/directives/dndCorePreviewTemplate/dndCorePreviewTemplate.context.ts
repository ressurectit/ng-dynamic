import {LayoutDragItem} from '../dndCoreDesigner/dndCoreDesigner.interface';

/**
 * Context passed to dnd core preview template
 */
export interface DndCorePreviewTemplateContext
{
    /**
     * Instance of layout drag data
     */
    $implicit: LayoutDragItem;
}