import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {DataBlockComponentOptions} from '../dataBlock.options';

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
            propertiesMetadata: []
        },
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}