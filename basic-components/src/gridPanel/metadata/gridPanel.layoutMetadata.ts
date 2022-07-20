import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Func} from '@jscrpt/common';

import {GridPanelComponentOptions} from '../gridPanel.options';

/**
 * Grid panel layout metadata
 */
export class GridPanelLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<GridPanelComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo =
    {
        name: 'Grid',
        description: 'Layout component with rows, and columns',
        group: 'Layout',
    };

    /**
     * @inheritdoc
     */
    public getDescendants?: Func<LayoutComponentMetadata[], [GridPanelComponentOptions|undefined|null]> = options => options?.cells ?? [];

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}