import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {MaterialPeriodComponentOptions} from '../period.options';
import {MaterialPeriodModel} from './period.model';


/**
 * Material period layout metadata
 */
export class MaterialPeriodLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<MaterialPeriodComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<MaterialPeriodComponentOptions> =
    {
        name: 'Period',
        description: 'Material period field',
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
                    modelType: MaterialPeriodModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor(['label', 'placeholder', 'hint', 'appearance', 'controlName']),
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