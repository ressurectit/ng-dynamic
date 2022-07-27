import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

/**
 * Options for style block component
 */
export interface StyleBlockComponentOptions
{
    /**
     * Metadata for component displayed as content of style block
     */
    content: LayoutComponentMetadata|undefined|null;
}