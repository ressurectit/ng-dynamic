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
     * Parent layout component iterator item
     */
    parent: LayoutComponentsIteratorItem|undefined|null;

    /**
     * Index of layout component in current level
     */
    levelIndex: number;

    /**
     * Current level of nexted components, 0 is root component
     */
    level: number;
}

/**
 * Item for layout components children iterator
 */
export interface LayoutComponentsChildrenIteratorItem
{
    /**
     * Metadata for layout component
     */
    metadata: LayoutComponentMetadata;

    /**
     * Index of child in its parent
     */
    index: number;
}