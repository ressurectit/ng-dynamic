import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {SelectComponentOptions} from '../select.options';
import {SelectModel} from './select.model';


/**
 *  select layout metadata
 */
export class SelectLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<SelectComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<SelectComponentOptions> =
    {
        name: 'Select',
        description: 'Dropdown',
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
                    modelType: SelectModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor<SelectModel>(['label', 'placeholder', 'multiple', 'controlName']),
                    ],
                },
            ],
        },
        defaultOptions:
        {
            label: 'Input label',
            placeholder: 'Placeholder',
            multiple: false,
        },
        group: 'Form fields'
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}