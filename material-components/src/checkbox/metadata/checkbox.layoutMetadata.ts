import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {MaterialCheckboxComponentOptions} from '../checkbox.options';
import {MaterialCheckboxModel} from './checkbox.model';


/**
 * Material checkbox layout metadata
 */
export class MaterialCheckboxLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<MaterialCheckboxComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<MaterialCheckboxComponentOptions> =
    {
        name: 'Checkbox',
        description: 'Material checkbox',
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
                    modelType: MaterialCheckboxModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor(['label']),
                    ],
                },
            ],
        },
        defaultOptions:
        {
            label: 'Input label',
        },
        group: 'Material form fields'
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}