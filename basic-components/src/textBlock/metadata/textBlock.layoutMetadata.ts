import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

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
    public metaInfo?: LayoutEditorMetadataInfo<TextBlockComponentOptions> =
    {
        name: 'Text block',
        description: 'Displays text',
        group: 'Texts',
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
                {
                    modelType: TextBlockModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor<TextBlockModel>(['text']),
                    ],
                },
            ],
        },
        defaultOptions:
        {
            text: 'This is your text'
        }
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}