import {GenericLayoutMetadata, LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {GridPanelCellComponentOptions} from './gridPanelCell.options';

/**
 * Text block layout metadata descriptor
 */
export class GridPanelCellLayoutMetadata extends GenericLayoutMetadata<GridPanelCellComponentOptions>
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected async _getInstance(): Promise<LayoutEditorMetadataDescriptor<GridPanelCellComponentOptions>>
    {
        return new (await import('./gridPanelCell.layoutMetadata')).GridPanelCellLayoutEditorMetadata();
    }
}