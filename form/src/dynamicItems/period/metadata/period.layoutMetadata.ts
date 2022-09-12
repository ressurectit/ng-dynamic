import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {PeriodComponentOptions} from '../period.options';
import {PeriodModel} from './period.model';


/**
 * Period layout metadata
 */
export class PeriodLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<PeriodComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<PeriodComponentOptions> =
    {
        name: 'Period',
        description: 'Period field',
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
                    modelType: PeriodModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor<PeriodModel>(['label', 'placeholder', 'controlName']),
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