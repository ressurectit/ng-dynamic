import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {DataTableComponentOptions} from './dataTable.options';

/**
 * Data table layout metadata loader
 */
export const DataTableLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<DataTableComponentOptions>> = async () => new (await import('./metadata/dataTable.layoutMetadata')).DataTableLayoutEditorMetadata();