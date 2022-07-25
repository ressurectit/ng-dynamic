import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {MaterialDatepickerComponentOptions} from '../datepicker.options';
import {MaterialDatepickerModel} from './datepicker.model';


/**
 * Material datepicker layout metadata
 */
export class MaterialDatepickerLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<MaterialDatepickerComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<MaterialDatepickerComponentOptions> =
    {
        name: 'Datepicker',
        description: 'Material datepicker',
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
                    modelType: MaterialDatepickerModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor<MaterialDatepickerModel>(['label', 'placeholder', 'hint', 'appearance', 'controlName']),
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