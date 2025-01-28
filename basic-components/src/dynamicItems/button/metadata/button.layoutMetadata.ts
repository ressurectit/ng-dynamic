import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {ButtonComponentOptions} from '../button.options';
import {ButtonModel} from './button.model';
import {ButtonPresetsPropertiesControlComponent} from '../../../misc/components';

/**
 * Button layout metadata
 */
export class ButtonLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<ButtonComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<ButtonComponentOptions> =
    {
        name: 'Button',
        description: 'Simple button',
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
                    modelType: ButtonModel,
                    propertiesControls: 
                    [
                        ButtonPresetsPropertiesControlComponent,
                        genericPropertiesControlFor<ButtonModel>(['buttonCssClass', 'type', 'text', 'icon', 'tooltip', 'disabled']),
                    ],
                },
            ],
        },
        defaultOptions:
        {
            text: 'Click me',
            disabled: false,
            buttonCssClass: 'btn btn-primary',
            type: 'button',
        }
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}