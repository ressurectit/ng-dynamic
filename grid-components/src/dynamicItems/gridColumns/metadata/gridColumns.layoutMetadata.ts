import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Action, Func, Func0} from '@jscrpt/common';

import {GridColumnsComponentOptions} from '../gridColumns.options';

/**
 * Grid columns layout metadata
 */
export class GridColumnsLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<GridColumnsComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<GridColumnsComponentOptions> =
    {
        name: 'Grid columns',
        description: 'Allows adding/removing columns into grid',
        group: 'Grid',
        dragDisabled: true,
    };

    /**
     * @inheritdoc
     */
    public addDescendant?: Action<[LayoutComponentMetadata, GridColumnsComponentOptions, number]> = (metadata, options, index) =>
    {
        options.columns ??= [];
        options.columns.splice(index, 0, metadata);
    };

    /**
     * @inheritdoc
     */
    public canDropMetadata?: Func<boolean, [GridColumnsComponentOptions|undefined|null]> = () => true;

    /**
     * @inheritdoc
     */
    public isHorizontalDrop?: Func<boolean, [GridColumnsComponentOptions|undefined|null]> = () => true;

    /**
     * @inheritdoc
     */
    public removeDescendant?: Action<[string, GridColumnsComponentOptions]> = (id, options) =>
    {
        options.columns ??= [];
        const index = options.columns.findIndex(itm => itm.id === id);
        options.columns.splice(index, 1);
    }

    /**
     * @inheritdoc
     */
    public customDropTypes?: Func0<{tree: string|string[], layout: string|string[]}> = () => 
    {
        return {
            layout: 'GRID_COLUMN',
            tree: 'TREE_GRID_COLUMN',
        };
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}