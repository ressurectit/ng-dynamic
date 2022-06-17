import {AsyncProperties} from '../../misc/types';

/**
 * Describes constructor of dynamic metadata type
 */
export interface DynamicMetadataCtor<TMetadata>
{
    /**
     * Creates instance of async dynamic metadata
     */
    new(): AsyncProperties<TMetadata>;
}