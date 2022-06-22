import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {Action} from '@jscrpt/common';

import {StackPanelComponentOptions} from '../stackPanel.options';

/**
 * Stack panel layout metadata
 */
export class StackPanelLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<StackPanelComponentOptions>
{
    //######################### protected fields #########################

    /**
     * @inheritdoc
     */
    protected _addDescendant: Action<[LayoutComponentMetadata, StackPanelComponentOptions, number]> = (metadata, options, index) =>
    {
        options.children ??= [];
        options.children.splice(index, 0, metadata);
    };

    /**
     * @inheritdoc
     */
    protected _removeDescendant: Action<[string, StackPanelComponentOptions]> = (id, options) =>
    {
        options.children ??= [];
        const index = options.children.findIndex(itm => itm.id === id);
        options.children.splice(index, 1);
    }

    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public get addDescendant(): Action<[LayoutComponentMetadata, StackPanelComponentOptions, number]>
    {
        return this._addDescendant;
    }

    /**
     * @inheritdoc
     */
    public get removeDescendant(): Action<[string, StackPanelComponentOptions]>
    {
        return this._removeDescendant;
    }
}