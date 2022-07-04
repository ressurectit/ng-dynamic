import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {GridPanelComponentOptions} from './gridPanel.options';

/**
 * Grid panel layout metadata loader
 */
export const GridPanelLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<GridPanelComponentOptions>> = async () => new (await import('./metadata/gridPanel.layoutMetadata')).GridPanelLayoutEditorMetadata();
