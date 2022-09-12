import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {CheckboxComponentOptions} from '../checkbox.options';
import {CheckboxModel} from './checkbox.model';


/**
 * Checkbox layout metadata
 */
export class CheckboxLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<CheckboxComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<CheckboxComponentOptions> =
    {
        name: 'Checkbox',
        description: 'Checkbox',
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
                    modelType: CheckboxModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor<CheckboxModel>(['label', 'controlName']),
                    ],
                },
            ],
        },
        defaultOptions:
        {
            label: 'Input label',
        },
        group: 'Form fields'
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}