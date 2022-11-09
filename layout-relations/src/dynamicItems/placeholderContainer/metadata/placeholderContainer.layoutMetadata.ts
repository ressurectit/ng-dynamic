import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {Action2, Action3, Func1} from '@jscrpt/common';

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
        dragDisabled: true,
    };

    /**
     * @inheritdoc
     */
    public addDescendant?: Action3<LayoutComponentMetadata, PlaceholderContainerComponentOptions, number> = (metadata, options) =>
    {
        options.content = metadata;
    };

    /**
     * @inheritdoc
     */
    public canDropMetadata?: Func1<boolean, PlaceholderContainerComponentOptions|undefined|null> = options => !options?.content;

    /**
     * @inheritdoc
     */
    public removeDescendant?: Action2<string, PlaceholderContainerComponentOptions> = (_, options) =>
    {
        options.content = null;
    }

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}