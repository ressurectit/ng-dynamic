export interface DynamicMetadataCtor<TMetadata>
{
    new(): TMetadata;
}