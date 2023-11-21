import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';
import {LayoutComponent} from '@anglr/dynamic/layout';

import {DataBlockComponentOptions} from './dataBlock.options';

/**
 * Data block layout metadata loader
 */
export const DataBlockLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<DataBlockComponentOptions>> = async () => new (await import('./metadata/dataBlock.layoutMetadata')).DataBlockLayoutEditorMetadata();

/**
 * Data block relations metadata loader
 */
export const DataBlockRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/dataBlock.relationsMetadata')).DataBlockRelationsEditorMetadata();

/**
 * Data block layout designer type loader
 */
export const DataBlockLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/dataBlockDesigner.component')).DataBlockDesignerSAComponent;

