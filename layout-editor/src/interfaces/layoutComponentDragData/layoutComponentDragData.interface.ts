import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

/**
 * Drag data that are passed to layout designer component
 */
export interface LayoutComponentDragData
{
    /**
     * Metadata of dragged component, that should be added at drop location
     */
    metadata: LayoutComponentMetadata|undefined|null;

    /**
     * Id of parent, used if dragged around tree
     */
    parentId: string|undefined|null;

    /**
     * Index of item that is being dragged
     */
    index: number|null;
}