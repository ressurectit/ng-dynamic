import {RelationsNodeMetadata} from '../metadata';

/**
 * Drag data that are passed to relations canvas droplist
 */
export interface RelationsNodeDragData
{
    /**
     * Metadata of dragged node, that should be added into canvas
     */
    metadata: RelationsNodeMetadata;
}