import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {PlaceholderContainerComponentOptions} from '../placeholderContainer.options';

/**
 * Placeholder container layout metadata
 */
export class PlaceholderContainerLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<PlaceholderContainerComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<PlaceholderContainerComponentOptions> =
    {
        name: 'Placeholder container',
        description: 'Placeholder container displays placeholders content',
        group: 'Component',
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}