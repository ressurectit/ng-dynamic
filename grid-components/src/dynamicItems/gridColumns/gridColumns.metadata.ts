import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {GridColumnsComponentOptions} from './gridColumns.options';

/**
 * Grid columns layout metadata loader
 */
export const GridColumnsLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<GridColumnsComponentOptions>> = async () => new (await import('./metadata/gridColumns.layoutMetadata')).GridColumnsLayoutEditorMetadata();

/**
 * Grid columns relations metadata loader
 */
export const GridColumnsRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/gridColumns.relationsMetadata')).GridColumnsRelationsEditorMetadata();

/**
 * Grid columns layout designer type loader
 */
export const GridColumnsLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/gridColumnsDesigner.component')).GridColumnsDesignerSAComponent;