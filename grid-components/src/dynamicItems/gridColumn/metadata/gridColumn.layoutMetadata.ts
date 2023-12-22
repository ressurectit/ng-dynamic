import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {Func0} from '@jscrpt/common';

import {GridColumnComponentOptions} from '../gridColumn.options';

/**
 * Grid column layout metadata
 */
export class GridColumnLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<GridColumnComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<GridColumnComponentOptions> =
    {
        name: 'Grid column',
        description: 'Definition of grid column header and content',
        group: 'Grid',
    };

    /**
     * @inheritdoc
     */
    public customDragType?: Func0<{tree: string, layout: string}> = () =>
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