import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Action, Func, Func0} from '@jscrpt/common';

import {DataLoaderComponentOptions} from '../dataLoader.options';

/**
 * Data loader layout metadata
 */
export class DataLoaderLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<DataLoaderComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<DataLoaderComponentOptions> =
    {
        name: 'Data loader',
        description: 'Allows to set up data loader plugin',
        group: 'Grid',
        dragDisabled: true,
    };

    /**
     * @inheritdoc
     */
    public addDescendant?: Action<[LayoutComponentMetadata, DataLoaderComponentOptions, number]> = (metadata, options) =>
    {
        options.plugin = metadata;
    };

    /**
     * @inheritdoc
     */
    public canDropMetadata?: Func<boolean, [DataLoaderComponentOptions|undefined|null]> = options => !options?.plugin;

    /**
     * @inheritdoc
     */
    public removeDescendant?: Action<[string, DataLoaderComponentOptions]> = (_, options) =>
    {
        options.plugin = null;
    };

    /**
     * @inheritdoc
     */
    public customDropTypes?: Func0<{tree: string|string[], layout: string|string[]}> = () => 
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