import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {ButtonComponentOptions} from '../button.options';
import {ButtonModel} from './button.model';

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
                        genericPropertiesControlFor<ButtonModel>(['buttonCssClass', 'text', 'disabled']),
                    ],
                },
            ],
        },
        defaultOptions:
        {
            text: 'Click me',
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