import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';
import {LayoutComponent} from '@anglr/dynamic/layout';

import {ForBlockComponentOptions} from './forBlock.options';

/**
 * For block layout metadata loader
 */
export const ForBlockLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<ForBlockComponentOptions>> = async () => new (await import('./metadata/forBlock.layoutMetadata')).ForBlockLayoutEditorMetadata();

/**
 * For block relations metadata loader
 */
export const ForBlockRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/forBlock.relationsMetadata')).ForBlockRelationsEditorMetadata();

/**
 * For block layout designer type loader
 */
export const ForBlockLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/forBlockDesigner.component')).ForBlockDesignerSAComponent;
