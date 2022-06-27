import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {TextBlockComponentOptions} from '../textBlock.options';
import {TextBlockModel} from './textBlock.model';

/**
 * Text block layout metadata
 */
export class TextBlockLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<TextBlockComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo =
    {
        name: 'Text block',
        description: 'Displays text',
        optionsMetadata:
        {
            modelType: TextBlockModel,
            propertiesControls: [],
        }
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}