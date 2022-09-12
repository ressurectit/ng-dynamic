import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {RadioComponentOptions} from '../radio.options';
import {RadioModel} from './radio.model';


/**
 * Radio layout metadata
 */
export class RadioLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<RadioComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<RadioComponentOptions> =
    {
        name: 'Radio',
        description: 'Radio',
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
                    modelType: RadioModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor<RadioModel>(['options', 'controlName']),
                    ],
                },
            ],
        },
        defaultOptions:
        {
            options: 'Radio'
        },
        group: 'Form fields'
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}