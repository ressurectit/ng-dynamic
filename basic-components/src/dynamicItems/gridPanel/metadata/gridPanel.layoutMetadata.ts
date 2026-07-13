import {getPropertiesControl, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {GridPanelComponentOptions} from '../gridPanel.options';
import {RowsColumnsModel} from '../../../misc/model';
import {RowsColumnsPropertiesControlComponent} from '../../../misc/components';
import {GridPanelModel} from './gridPanel.model';
import {GridAreasPropertiesControlComponent} from '../misc/components';

/**
 * Grid panel layout metadata
 */
export class GridPanelLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<GridPanelComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo =
    {
        name: 'Grid panel',
        description: 'Layout component with rows, and columns and areas',
        group: 'Layout',
        optionsMetadata:
        {
            propertiesMetadata:
            [
                {
                    modelType: RowsColumnsModel,
                    propertiesControls:
                    [
                        getPropertiesControl(RowsColumnsPropertiesControlComponent),
                    ],
                },
                {
                    modelType: GridPanelModel,
                    propertiesControls:
                    [
                        getPropertiesControl(GridAreasPropertiesControlComponent),
                    ],
                },
            ],
        },
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}
