import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Action, Func, Func0} from '@jscrpt/common';

import {MetadataSelectorComponentOptions} from '../metadataSelector.options';

/**
 * Metadata selector layout metadata
 */
export class MetadataSelectorLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<MetadataSelectorComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<MetadataSelectorComponentOptions> =
    {
        name: 'Metadata selector',
        description: 'Allows to set up metadata selector plugin',
        group: 'Grid',
        dragDisabled: true,
    };

    /**
     * @inheritdoc
     */
    public addDescendant?: Action<[LayoutComponentMetadata, MetadataSelectorComponentOptions, number]> = (metadata, options) =>
    {
        options.plugin = metadata;
    };

    /**
     * @inheritdoc
     */
    public canDropMetadata?: Func<boolean, [MetadataSelectorComponentOptions|undefined|null]> = options => !options?.plugin;

    /**
     * @inheritdoc
     */
    public removeDescendant?: Action<[string, MetadataSelectorComponentOptions]> = (_, options) =>
    {
        options.plugin = null;
    };

    /**
     * @inheritdoc
     */
    public customDropTypes?: Func0<{tree: string|string[], layout: string|string[]}> = () => 
    {
        return {
            layout: 'METADATA_SELECTOR',
            tree: 'TREE_METADATA_SELECTOR',
        };
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}