import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {GridColumnComponentOptions} from './gridColumn.options';

/**
 * Grid column layout metadata loader
 */
export const GridColumnLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<GridColumnComponentOptions>> = async () => new (await import('./metadata/gridColumn.layoutMetadata')).GridColumnLayoutEditorMetadata();

/**
 * Grid column layout designer type loader
 */
export const GridColumnLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/gridColumnDesigner.component')).GridColumnDesignerSAComponent;