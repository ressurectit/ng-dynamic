import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {ToggleButtonComponentOptions} from '../toggleButton.options';
import {ToggleButtonModel} from './toggleButton.model';
import {ButtonPresetsPropertiesControlComponent} from '../../../misc/components';

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
        description: 'Button that switches between two states',
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
                        ButtonPresetsPropertiesControlComponent,
                        genericPropertiesControlFor<ToggleButtonModel>(['buttonCssClass', 'onText', 'offText', 'state', 'disabled']),
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
            buttonCssClass: 'btn btn-primary',
        }
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}