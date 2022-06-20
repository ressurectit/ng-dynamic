import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {GenericLayoutMetadata, LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {GridPanelComponentOptions} from './gridPanel.options';

/**
 * Text block layout metadata descriptor
 */
export class GridPanelLayoutMetadata extends GenericLayoutMetadata<GridPanelComponentOptions>
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected async _getInstance(): Promise<LayoutEditorMetadataDescriptor<LayoutComponentMetadata<GridPanelComponentOptions>>>
    {
        return new (await import('./gridPanel.layoutMetadata')).GridPanelLayoutEditorMetadata();
    }
}