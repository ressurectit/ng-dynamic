import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {GridPanelCellComponentOptions} from './gridPanelCell.options';

/**
 * Grid panel cell layout metadata loader
 */
export const GridPanelCellLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<GridPanelCellComponentOptions>> = async () => new (await import('./metadata/gridPanelCell.layoutMetadata')).GridPanelCellLayoutEditorMetadata();
