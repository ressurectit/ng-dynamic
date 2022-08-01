import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {TemplateBlockComponentOptions} from '../templateBlock.options';
import {TemplateBlockModel} from './templateBlock.model';

/**
 * Template block layout metadata
 */
export class TemplateBlockLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<TemplateBlockComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<TemplateBlockComponentOptions> =
    {
        name: 'Template block',
        description: 'Displays another layout template as contents',
        group: 'Data',
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
                    modelType: TemplateBlockModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor<TemplateBlockModel>(['layoutId']),
                    ],
                },
            ],
        },
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}