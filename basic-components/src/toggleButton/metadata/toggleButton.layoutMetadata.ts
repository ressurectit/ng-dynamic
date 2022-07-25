import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {ToggleButtonComponentOptions} from '../toggleButton.options';
import {ToggleButtonModel} from './toggleButton.model';

/**
 * Toggle button layout metadata
 */
export class ToggleButtonLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<ToggleButtonComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<ToggleButtonComponentOptions> =
    {
        name: 'Toggle button',
        description: 'Toggle button',
        group: 'Buttons',
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
                    modelType: ToggleButtonModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor<ToggleButtonModel>(['onText', 'offText', 'state', 'disabled']),
                    ],
                },
            ],
        },
        defaultOptions:
        {
            onText: 'On',
            offText: 'Off',
            state: true,
            disabled: false,
        }
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}