import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {codePropertiesControlFor} from '@anglr/dynamic/layout-editor';
import {HtmlLanguageModel} from '@anglr/dynamic';

import {HtmlBlockComponentOptions} from '../htmlBlock.options';
import {HtmlBlockModel} from './htmlBlock.model';

/**
 * Html block layout metadata
 */
export class HtmlBlockLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<HtmlBlockComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<HtmlBlockComponentOptions> =
    {
        name: 'Html block',
        description: 'Html block - displays html or string',
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
                    modelType: HtmlBlockModel,
                    propertiesControls:
                    [
                        codePropertiesControlFor<HtmlBlockModel>('content', HtmlLanguageModel),
                    ],
                },
            ]
        },
        defaultOptions:
        {
            content: '<div>This is your <strong>HTML</strong> block</div>'
        }
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}