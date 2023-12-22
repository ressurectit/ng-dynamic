import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {Func0} from '@jscrpt/common';

import {SyncDataLoaderComponentOptions} from '../syncDataLoader.options';

/**
 * Sync data loader layout metadata
 */
export class SyncDataLoaderLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<SyncDataLoaderComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<SyncDataLoaderComponentOptions> =
    {
        name: 'Sync data loader',
        description: 'Sync data loader grid plugin for obtaining data',
        group: 'Grid',
    };

    /**
     * @inheritdoc
     */
    public customDragType?: Func0<{tree: string, layout: string}> = () =>
    {
        return {
            layout: 'DATA_LOADER',
            tree: 'TREE_DATA_LOADER',
        };
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}