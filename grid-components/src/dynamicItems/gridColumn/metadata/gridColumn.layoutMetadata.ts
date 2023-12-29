import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo, genericPropertiesControlFor} from '@anglr/dynamic/layout-editor';
import {Func0} from '@jscrpt/common';

import {GridColumnComponentOptions} from '../gridColumn.options';
import {GridColumnModel} from './gridColumn.model';

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
        optionsMetadata:
        {
            propertiesMetadata:
            [
                {
                    modelType: GridColumnModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor<GridColumnModel>(['width']),
                    ],
                },
            ]
        },
        defaultOptions:
        {
            width: '1fr',
        }
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