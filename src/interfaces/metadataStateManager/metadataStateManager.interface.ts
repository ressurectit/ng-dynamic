/**
 * Allows working with state of metadata
 */
export interface MetadataStateManager<TMetadata = any>
{
    /**
     * Gets current state of metadata
     */
    getMetadata(): TMetadata|null;
}