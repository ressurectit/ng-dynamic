import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {StackPanelComponentOptions} from './stackPanel.options';

/**
 * Stack panel layout metadata loader
 */
export const StackPanelLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<StackPanelComponentOptions>> = async () => new (await import('./metadata/stackPanel.layoutMetadata')).StackPanelLayoutEditorMetadata();
