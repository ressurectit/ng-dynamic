import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Action, Func} from '@jscrpt/common';

import {GridColumnHeaderComponentOptions} from '../gridColumnHeader.options';

/**
 * Grid column header layout metadata
 */
export class GridColumnHeaderLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<GridColumnHeaderComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<GridColumnHeaderComponentOptions> =
    {
        name: 'Grid column header',
        description: 'Represenst content of grid column header',
        group: 'Grid',
        dragDisabled: true,
    };

    /**
     * @inheritdoc
     */
    public addDescendant?: Action<[LayoutComponentMetadata, GridColumnHeaderComponentOptions, number]> = (metadata, options) =>
    {
        options.content = metadata;
    };

    /**
     * @inheritdoc
     */
    public canDropMetadata?: Func<boolean, [GridColumnHeaderComponentOptions|undefined|null]> = options => !options?.content;

    /**
     * @inheritdoc
     */
    public removeDescendant?: Action<[string, GridColumnHeaderComponentOptions]> = (_, options) =>
    {
        options.content = null;
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}