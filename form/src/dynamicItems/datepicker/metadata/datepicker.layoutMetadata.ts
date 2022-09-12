import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {DatepickerComponentOptions} from '../datepicker.options';
import {DatepickerModel} from './datepicker.model';


/**
 *  datepicker layout metadata
 */
export class DatepickerLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<DatepickerComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<DatepickerComponentOptions> =
    {
        name: 'Datepicker',
        description: 'Datepicker',
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
                    modelType: DatepickerModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor<DatepickerModel>(['label', 'placeholder', 'controlName']),
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