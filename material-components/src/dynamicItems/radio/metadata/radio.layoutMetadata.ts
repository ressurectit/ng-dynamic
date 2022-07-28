import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {MaterialRadioComponentOptions} from '../radio.options';
import {MaterialRadioModel} from './radio.model';


/**
 * Material text field layout metadata
 */
export class MaterialRadioLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<MaterialRadioComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<MaterialRadioComponentOptions> =
    {
        name: 'Radio',
        description: 'Material radio',
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
                    modelType: MaterialRadioModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor<MaterialRadioModel>(['options', 'controlName']),
                    ],
                },
            ],
        },
        defaultOptions:
        {
            options: 'Radio'
        },
        group: 'Material form fields'
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}