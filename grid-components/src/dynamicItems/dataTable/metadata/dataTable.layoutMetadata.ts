import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {DataTableComponentOptions} from '../dataTable.options';

/**
 * Data table layout metadata
 */
export class DataTableLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<DataTableComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<DataTableComponentOptions> =
    {
        name: 'Data table',
        description: 'Displays table with data',
        group: 'Grid',
        optionsMetadata:
        {
            propertiesMetadata:
            [
                {
                    modelType: ComponentStylingModel,
                    propertiesControls: 
                    [
                        ComponentStylingPropertiesControlComponent,
                    ],
                },
            ],
        },
        defaultOptions:
        {
        }
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}