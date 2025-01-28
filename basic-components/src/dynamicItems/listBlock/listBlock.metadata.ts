import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';
import {LayoutComponent} from '@anglr/dynamic/layout';

import {ListBlockComponentOptions} from './listBlock.options';

/**
 * List block layout metadata loader
 */
export const ListBlockLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<ListBlockComponentOptions>> = async () => new (await import('./metadata/listBlock.layoutMetadata')).ListBlockLayoutEditorMetadata();

/**
 * List block relations metadata loader
 */
export const ListBlockRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/listBlock.relationsMetadata')).ListBlockRelationsEditorMetadata();

/**
 * List block layout designer type loader
 */
export const ListBlockLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/listBlockDesigner.component')).ListBlockDesignerComponent;
