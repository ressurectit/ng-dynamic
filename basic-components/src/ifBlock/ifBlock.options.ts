import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

/**
 * Options for if block component
 */
export interface IfBlockComponentOptions
{
    /**
     * Metadata for component displayed as content of if block
     */
    content: LayoutComponentMetadata|undefined|null;
}