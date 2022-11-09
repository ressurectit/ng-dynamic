import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

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

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}