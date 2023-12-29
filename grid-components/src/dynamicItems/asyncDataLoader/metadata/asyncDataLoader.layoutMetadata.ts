import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {Func0} from '@jscrpt/common';

import {AsyncDataLoaderComponentOptions} from '../asyncDataLoader.options';

/**
 * Async data loader layout metadata
 */
export class AsyncDataLoaderLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<AsyncDataLoaderComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<AsyncDataLoaderComponentOptions> =
    {
        name: 'Async data loader',
        description: 'Async data loader grid plugin for obtaining data',
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