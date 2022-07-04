/**
 * Describes function that loads asynchronous metadata definition
 */
export interface DynamicMetadataLoader<TMetadata>
{
    (): Promise<TMetadata>;
}