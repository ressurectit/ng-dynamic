import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {GridPanelAreaComponentOptions} from './gridPanelArea.options';

/**
 * Grid panel area layout metadata loader
 */
export const GridPanelAreaLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<GridPanelAreaComponentOptions>> = async () => new (await import('./metadata/gridPanelArea.layoutMetadata')).GridPanelAreaLayoutEditorMetadata();
