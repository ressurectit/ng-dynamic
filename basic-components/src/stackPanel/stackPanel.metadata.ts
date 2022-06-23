import {GenericLayoutAsyncMetadata, LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {StackPanelComponentOptions} from './stackPanel.options';

/**
 * Stack panel layout metadata descriptor
 */
export class StackPanelLayoutMetadata extends GenericLayoutAsyncMetadata<StackPanelComponentOptions>
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected async _getInstance(): Promise<LayoutEditorMetadataDescriptor<StackPanelComponentOptions>>
    {
        return new (await import('./metadata/stackPanel.layoutMetadata')).StackPanelLayoutEditorMetadata();
    }
}