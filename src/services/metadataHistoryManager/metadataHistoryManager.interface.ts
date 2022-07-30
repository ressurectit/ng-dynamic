/**
 * Allows working with state of metadata
 */
export interface MetadataHistoryManagerState<TMetadata = any>
{
    /**
     * Gets current state of metadata
     */
    getMetadata(): TMetadata|null;
}