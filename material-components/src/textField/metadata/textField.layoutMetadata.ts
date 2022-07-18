import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {MaterialTextFieldComponentOptions} from '../textField.options';
import {MaterialTextFieldModel} from './textBlock.model';


/**
 * Material text field layout metadata
 */
export class MaterialTextFieldLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<MaterialTextFieldComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<MaterialTextFieldComponentOptions> =
    {
        name: 'Text field',
        description: 'Material text field',
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
                    modelType: MaterialTextFieldModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor(['label', 'placeholder', 'hint']),
                    ],
                },
            ],
        },
        defaultOptions:
        {
            label: 'Input label',
            placeholder: 'Placeholder',
            hint: 'Hint'
        },
        group: 'Material form fields'
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}