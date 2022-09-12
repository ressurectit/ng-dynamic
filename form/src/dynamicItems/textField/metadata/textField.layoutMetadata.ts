import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {TextFieldComponentOptions} from '../textField.options';
import {TextFieldModel} from './textField.model';


/**
 * Text field layout metadata
 */
export class TextFieldLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<TextFieldComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<TextFieldComponentOptions> =
    {
        name: 'Text field',
        description: 'Text field',
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
                    modelType: TextFieldModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor<TextFieldModel>(['label', 'placeholder', 'controlName']),
                    ],
                },
            ],
        },
        defaultOptions:
        {
            label: 'Input label',
            placeholder: 'Placeholder',
        },
        group: 'Form fields'
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}