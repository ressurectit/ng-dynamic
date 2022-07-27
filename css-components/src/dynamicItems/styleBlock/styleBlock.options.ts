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

    /**
     * Css style string representation
     */
    style: string|undefined|null;
}