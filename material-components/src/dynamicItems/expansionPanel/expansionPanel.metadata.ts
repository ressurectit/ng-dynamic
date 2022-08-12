import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {MaterialExpansionPanelComponentOptions} from './expansionPanel.options';

/**
 * Material expansion panel layout metadata loader
 */
export const MaterialExpansionPanelLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<MaterialExpansionPanelComponentOptions>> = async () => new (await import('./metadata/expansionPanel.layoutMetadata')).MaterialExpansionPanelLayoutEditorMetadata();
