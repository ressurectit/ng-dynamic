import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Action, Func} from '@jscrpt/common';

import {GridColumnContentComponentOptions} from '../gridColumnContent.options';

/**
 * Grid column content layout metadata
 */
export class GridColumnContentLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<GridColumnContentComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<GridColumnContentComponentOptions> =
    {
        name: 'Grid column content',
        description: 'Represenst content of grid column content',
        group: 'Grid',
        dragDisabled: true,
    };

    /**
     * @inheritdoc
     */
    public addDescendant?: Action<[LayoutComponentMetadata, GridColumnContentComponentOptions, number]> = (metadata, options) =>
    {
        options.content = metadata;
    };

    /**
     * @inheritdoc
     */
    public canDropMetadata?: Func<boolean, [GridColumnContentComponentOptions|undefined|null]> = options => !options?.content;

    /**
     * @inheritdoc
     */
    public removeDescendant?: Action<[string, GridColumnContentComponentOptions]> = (_, options) =>
    {
        options.content = null;
    }

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}