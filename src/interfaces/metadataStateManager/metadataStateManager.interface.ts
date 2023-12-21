/**
 * Allows obtaining editor metadata
 */
export interface EditorMetadataManager<TMetadata = any>
{
    /**
     * Gets current metadata from editor
     */
    getMetadata(): TMetadata|null;
}