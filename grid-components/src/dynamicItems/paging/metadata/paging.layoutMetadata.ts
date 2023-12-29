import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Action, Func, Func0} from '@jscrpt/common';

import {PagingComponentOptions} from '../paging.options';

/**
 * Paging layout metadata
 */
export class PagingLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<PagingComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<PagingComponentOptions> =
    {
        name: 'Paging',
        description: 'Allows to set up paging plugin',
        group: 'Grid',
        dragDisabled: true,
    };

    /**
     * @inheritdoc
     */
    public addDescendant?: Action<[LayoutComponentMetadata, PagingComponentOptions, number]> = (metadata, options) =>
    {
        options.plugin = metadata;
    };

    /**
     * @inheritdoc
     */
    public canDropMetadata?: Func<boolean, [PagingComponentOptions|undefined|null]> = options => !options?.plugin;

    /**
     * @inheritdoc
     */
    public removeDescendant?: Action<[string, PagingComponentOptions]> = (_, options) =>
    {
        options.plugin = null;
    };

    /**
     * @inheritdoc
     */
    public customDropTypes?: Func0<{tree: string|string[], layout: string|string[]}> = () => 
    {
        return {
            layout: 'PAGING',
            tree: 'TREE_PAGING',
        };
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}