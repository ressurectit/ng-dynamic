import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {MaterialSelectComponentOptions} from '../select.options';
import {MaterialSelectModel} from './select.model';


/**
 * Material select layout metadata
 */
export class MaterialSelectLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<MaterialSelectComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<MaterialSelectComponentOptions> =
    {
        name: 'Select',
        description: 'Material select',
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
                    modelType: MaterialSelectModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor<MaterialSelectModel>(['label', 'placeholder', 'hint', 'appearance', 'multiple', 'controlName']),
                    ],
                },
            ],
        },
        defaultOptions:
        {
            label: 'Input label',
            placeholder: 'Placeholder',
            hint: 'Hint',
            multiple: false,
        },
        group: 'Material form fields'
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}