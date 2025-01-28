import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {RichTextBlockPropertiesControlComponent} from '../misc/components';
import {RichTextBlockComponentOptions} from '../richTextBlock.options';
import {RichTextBlockModel} from './richTextBlock.model';

/**
 * Rich text block layout metadata
 */
export class RichTextBlockLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<RichTextBlockComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<RichTextBlockComponentOptions> =
    {
        name: 'Rich text block',
        description: 'WYSIWYG editor allowing formatting of multiline text',
        group: 'Texts',
        optionsMetadata:
        {
            propertiesMetadata:
            [
                {
                    modelType: RichTextBlockModel,
                    propertiesControls: 
                    [
                        RichTextBlockPropertiesControlComponent,
                    ],
                },
            ]
        },
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}