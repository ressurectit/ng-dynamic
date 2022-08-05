import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {DndDropEvent} from 'ngx-drag-drop';

/**
 * Drag data that are passed to layout designer component
 */
export interface LayoutComponentDragData
{
    /**
     * Metadata of dragged component, that should be added at drop location
     */
    metadata: LayoutComponentMetadata;

    /**
     * Id of parent, used if dragged around tree
     */
    parentId: string|undefined|null;
}

/**
 * Typed drop event data
 */
export interface DndDropEventData<TData = any> extends DndDropEvent
{
    data?: TData;
}