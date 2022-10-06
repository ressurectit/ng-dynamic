import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

/**
 * Options for placeholder container component
 */
export interface PlaceholderContainerComponentOptions
{
    /**
     * Metadata for component displayed as content of placeholder container
     */
    content: LayoutComponentMetadata|undefined|null;
}
