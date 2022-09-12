import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {TextareaComponentOptions} from '../textarea.options';
import {TextareaModel} from './textarea.model';


/**
 * Textarea layout metadata
 */
export class TextareaLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<TextareaComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<TextareaComponentOptions> =
    {
        name: 'Textarea',
        description: 'Textarea',
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
                    modelType: TextareaModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor<TextareaModel>(['label', 'placeholder', 'controlName']),
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