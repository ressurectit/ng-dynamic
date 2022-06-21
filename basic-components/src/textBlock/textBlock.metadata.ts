import {GenericLayoutMetadata, LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {TextBlockComponentOptions} from './textBlock.options';

/**
 * Text block layout metadata descriptor
 */
export class TextBlockLayoutMetadata extends GenericLayoutMetadata<TextBlockComponentOptions>
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected async _getInstance(): Promise<LayoutEditorMetadataDescriptor<TextBlockComponentOptions>>
    {
        return new (await import('./textBlock.layoutMetadata')).TextBlockLayoutEditorMetadata();
    }
}