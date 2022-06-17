import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {GenericLayoutMetadata, LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {StackPanelComponentOptions} from './stackPanel.options';

/**
 * Stack panel layout metadata descriptor
 */
export class StackPanelLayoutMetadata extends GenericLayoutMetadata<StackPanelComponentOptions>
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected async _getInstance(): Promise<LayoutEditorMetadataDescriptor<LayoutComponentMetadata<StackPanelComponentOptions>>>
    {
        return new (await import('./stackPanel.layoutMetadata')).StackPanelLayoutEditorMetadata();
    }
}