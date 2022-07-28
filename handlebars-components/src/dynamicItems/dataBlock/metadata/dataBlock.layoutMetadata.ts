import {codePropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {HandlebarsLanguageModel} from '@anglr/dynamic';

import {DataBlockComponentOptions} from '../dataBlock.options';
import {DataBlockModel} from './dataBlock.model';

/**
 * Data block layout metadata
 */
export class DataBlockLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<DataBlockComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<DataBlockComponentOptions> =
    {
        name: 'Data block',
        description: 'Data block - allows displaying data in template',
        group: 'Data',
        optionsMetadata:
        {
            propertiesMetadata:
            [
                {
                    modelType: DataBlockModel,
                    propertiesControls:
                    [
                        codePropertiesControlFor<DataBlockModel>('template', HandlebarsLanguageModel),
                    ],
                },
            ]
        },
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}