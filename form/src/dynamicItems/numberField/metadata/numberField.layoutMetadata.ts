import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {NumberFieldComponentOptions} from '../numberField.options';
import {NumberFieldModel} from './numberField.model';


/**
 *  Number field layout metadata
 */
export class NumberFieldLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<NumberFieldComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<NumberFieldComponentOptions> =
    {
        name: 'Number field',
        description: 'Number field',
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
                    modelType: NumberFieldModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor<NumberFieldModel>(['label', 'placeholder', 'controlName']),
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