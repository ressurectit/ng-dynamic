import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {Action2Rest, Action3Rest, Func1Rest} from '@jscrpt/common';

import {PlaceholderContainerComponentOptions} from '../placeholderContainer.options';

/**
 * Placeholder container layout metadata
 */
export class PlaceholderContainerLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<PlaceholderContainerComponentOptions, [string]>
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
    public addDescendant?: Action3Rest<LayoutComponentMetadata, PlaceholderContainerComponentOptions, number, [string]> = (metadata, options, _, id) =>
    {
        options.placeholderContainers ??= {};
        options.placeholderContainers[id] = metadata;
    };

    /**
     * @inheritdoc
     */
    public canDropMetadata?: Func1Rest<boolean, PlaceholderContainerComponentOptions|undefined|null, [string]> = (options, id) => !options?.placeholderContainers?.[id];

    /**
     * @inheritdoc
     */
    public removeDescendant?: Action2Rest<string, PlaceholderContainerComponentOptions, [string]> = (_, options, id) =>
    {
        if(options.placeholderContainers?.[id])
        {
            delete options.placeholderContainers[id];
        }
    }

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}