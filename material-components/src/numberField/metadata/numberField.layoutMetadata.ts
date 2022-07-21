import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {MaterialNumberFieldComponentOptions} from '../numberField.options';
import {MaterialNumberFieldModel} from './numberField.model';


/**
 * Material number field layout metadata
 */
export class MaterialNumberFieldLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<MaterialNumberFieldComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<MaterialNumberFieldComponentOptions> =
    {
        name: 'Number field',
        description: 'Material number field',
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
                    modelType: MaterialNumberFieldModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor(['label', 'placeholder', 'hint', 'appearance', 'controlName']),
                    ],
                },
            ],
        },
        defaultOptions:
        {
            label: 'Input label',
            placeholder: 'Placeholder',
            hint: 'Hint',
        },
        group: 'Material form fields'
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}