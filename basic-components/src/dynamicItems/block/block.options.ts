import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

/**
 * Options for block component
 */
export interface BlockComponentOptions
{
    /**
     * Metadata for component displayed as content of block
     */
    content: LayoutComponentMetadata|undefined|null;
}