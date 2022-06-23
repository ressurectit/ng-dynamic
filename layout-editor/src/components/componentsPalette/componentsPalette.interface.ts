import {DynamicItemSource} from '@anglr/dynamic';

import {LayoutEditorMetadataDescriptor} from '../../interfaces';

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