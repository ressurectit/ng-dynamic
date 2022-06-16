import {LayoutComponentMetadata} from '@anglr/dynamic';

/**
 * Transformation function that transforms layout component metadata
 */
export interface LayoutComponentTransform
{
    /**
     * Transforms layout component metadata
     * @param metadata - Metadata to be transformed
     */
    (metadata: LayoutComponentMetadata): LayoutComponentMetadata;
} 