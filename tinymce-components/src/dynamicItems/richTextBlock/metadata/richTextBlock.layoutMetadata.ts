import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {RichTextBlockComponentOptions} from '../richTextBlock.options';

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
            propertiesMetadata: []
        },
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}