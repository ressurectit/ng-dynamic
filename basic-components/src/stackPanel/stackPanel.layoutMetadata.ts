import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {Func} from '@jscrpt/common';

import {StackPanelComponentOptions} from './stackPanel.options';

/**
 * Stack panel layout metadata
 */
export class StackPanelLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<StackPanelComponentOptions>
{
    //######################### protected fields #########################

    /**
     * @inheritdoc
     */
    protected _addDescendant: Func<StackPanelComponentOptions, [LayoutComponentMetadata, StackPanelComponentOptions, number]> = (metadata, options, index) =>
    {
        options = {...options};

        options.children ??= [];
        options.children.splice(index, 0, metadata);

        return options;
    };

    /**
     * @inheritdoc
     */
    protected _removeDescendant: Func<StackPanelComponentOptions, [string, StackPanelComponentOptions]> = (id, options) =>
    {
        options = {...options};

        options.children ??= [];
        const index = options.children.findIndex(itm => itm.id === id);
        options.children.splice(index, 1);

        return options;
    }

    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public get addDescendant(): Func<StackPanelComponentOptions, [LayoutComponentMetadata, StackPanelComponentOptions, number]>
    {
        return this._addDescendant;
    }

    /**
     * @inheritdoc
     */
    public get removeDescendant(): Func<StackPanelComponentOptions, [string, StackPanelComponentOptions]>
    {
        return this._removeDescendant;
    }
}