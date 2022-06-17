import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {Func} from '@jscrpt/common';

import {StackPanelComponentOptions} from './stackPanel.options';

/**
 * Stack panel layout metadata
 */
export class StackPanelLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<LayoutComponentMetadata<StackPanelComponentOptions>>
{
    //######################### protected fields #########################

    /**
     * Getter for obtaining components children metadata
     */
    protected _descendantsGetter: Func<LayoutComponentMetadata[]|undefined|null, [LayoutComponentMetadata<StackPanelComponentOptions>]> = metadata => metadata.options?.children;

    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public get descendantsGetter(): Func<LayoutComponentMetadata[]|null|undefined, [LayoutComponentMetadata<StackPanelComponentOptions>]>
    {
        return this._descendantsGetter;
    }
}