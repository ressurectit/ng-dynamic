import {DynamicItemSource} from './dynamicItemSource.interface';

/**
 * Metadata for all dynamic items
 */
export interface DynamicItemMetadata extends DynamicItemSource
{
    /**
     * Unique id of dynamic item
     */
    id: string;

    /**
     * Display name of dynamic item, this is how is item displayed during editation
     */
    displayName?: string;
}