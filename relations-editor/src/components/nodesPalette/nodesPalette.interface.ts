import {DynamicItemSource} from '@anglr/dynamic';

import {RelationsNodeDef} from '../../misc/types';

/**
 * Represents item in nodes palette
 */
export interface NodesPaletteItem
{
    /**
     * Definition of source for item
     */
    itemSource: DynamicItemSource;

    /**
     * Relations editor metadata for node
     */
    metadata: RelationsNodeDef;
}
