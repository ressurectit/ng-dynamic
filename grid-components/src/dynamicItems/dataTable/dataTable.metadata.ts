import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {DataTableComponentOptions} from './dataTable.options';

/**
 * Data table layout metadata loader
 */
export const DataTableLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<DataTableComponentOptions>> = async () => new (await import('./metadata/dataTable.layoutMetadata')).DataTableLayoutEditorMetadata();

/**
 * Data table layout designer type loader
 */
export const DataTableLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/dataTableDesigner.component')).DataTableDesignerSAComponent;