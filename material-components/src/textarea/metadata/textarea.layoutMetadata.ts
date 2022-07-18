import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {MaterialTextareaComponentOptions} from '../textarea.options';
import {MaterialTextareaModel} from './textarea.model';


/**
 * Material textarea layout metadata
 */
export class MaterialTextareaLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<MaterialTextareaComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<MaterialTextareaComponentOptions> =
    {
        name: 'Textarea',
        description: 'Material textarea',
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
                    modelType: MaterialTextareaModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor(['label', 'placeholder', 'hint', 'appearance']),
                    ],
                },
            ],
        },
        defaultOptions:
        {
            label: 'Input label',
            placeholder: 'Placeholder',
            hint: 'Hint',
            appearance: 'standard',
        },
        group: 'Material form fields'
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}