import {GenericLayoutAsyncMetadata, LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {GridPanelComponentOptions} from './gridPanel.options';

/**
 * Text block layout metadata descriptor
 */
export class GridPanelLayoutMetadata extends GenericLayoutAsyncMetadata<GridPanelComponentOptions>
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected async _getInstance(): Promise<LayoutEditorMetadataDescriptor<GridPanelComponentOptions>>
    {
        return new (await import('./metadata/gridPanel.layoutMetadata')).GridPanelLayoutEditorMetadata();
    }
}