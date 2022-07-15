import {DynamicItemDefData, DynamicItemSource} from '@anglr/dynamic';

import {LayoutEditorMetadataDescriptor} from '../../decorators';

/**
 * Represents item in component palette
 */
export interface ComponentsPaletteItem
{
    /**
     * Definition of source for item
     */
    itemSource: DynamicItemSource;

    /**
     * Layout editor metadata for item
     */
    metadata: LayoutEditorMetadataDescriptor;
}

/**
 * Represents available types for layout dynamic module
 */
export type LayoutModuleTypes = DynamicItemDefData<string[]>;