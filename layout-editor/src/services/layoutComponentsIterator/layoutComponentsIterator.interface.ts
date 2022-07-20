import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

/**
 * Item for layout components iterator
 */
export interface LayoutComponentsIteratorItem
{
    /**
     * Metadata for layout component
     */
    metadata: LayoutComponentMetadata;

    /**
     * Metadata for parent layout component
     */
    parentMetadata: LayoutComponentMetadata|undefined|null;

    /**
     * Index of layout component in current level
     */
    levelIndex: number;

    /**
     * Current level of nexted components, 0 is root component
     */
    level: number;
}