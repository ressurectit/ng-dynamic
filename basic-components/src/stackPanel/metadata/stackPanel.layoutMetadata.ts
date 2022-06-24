import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {Action, Func} from '@jscrpt/common';

import {StackPanelComponentOptions} from '../stackPanel.options';

/**
 * Stack panel layout metadata
 */
export class StackPanelLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<StackPanelComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo =
    {
        name: 'Stack',
        description: 'Layout component that stacks items horizontally or vertically',
        group: 'Layout',
    };

    /**
     * @inheritdoc
     */
    public addDescendant?: Action<[LayoutComponentMetadata, StackPanelComponentOptions, number]> = (metadata, options, index) =>
    {
        options.children ??= [];
        options.children.splice(index, 0, metadata);
    };

    /**
     * @inheritdoc
     */
    public canDropMetadata?: Func<boolean, [StackPanelComponentOptions|undefined|null]> = () => true;

    /**
     * @inheritdoc
     */
    public isHorizontalDrop?: Func<boolean, [StackPanelComponentOptions|undefined|null]> = options => !!options?.horizontal;

    /**
     * @inheritdoc
     */
    public removeDescendant?: Action<[string, StackPanelComponentOptions]> = (id, options) =>
    {
        options.children ??= [];
        const index = options.children.findIndex(itm => itm.id === id);
        options.children.splice(index, 1);
    }

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}