import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

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