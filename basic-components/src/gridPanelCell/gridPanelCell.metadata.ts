import {GenericLayoutAsyncMetadata, LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {GridPanelCellComponentOptions} from './gridPanelCell.options';

/**
 * Text block layout metadata descriptor
 */
export class GridPanelCellLayoutMetadata extends GenericLayoutAsyncMetadata<GridPanelCellComponentOptions>
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected async _getInstance(): Promise<LayoutEditorMetadataDescriptor<GridPanelCellComponentOptions>>
    {
        return new (await import('./metadata/gridPanelCell.layoutMetadata')).GridPanelCellLayoutEditorMetadata();
    }
}