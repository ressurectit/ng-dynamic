import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';
import {LayoutComponent} from '@anglr/dynamic/layout';

import {IfBlockComponentOptions} from './ifBlock.options';

/**
 * If block layout metadata loader
 */
export const IfBlockLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<IfBlockComponentOptions>> = async () => new (await import('./metadata/ifBlock.layoutMetadata')).IfBlockLayoutEditorMetadata();

/**
 * If block relations metadata loader
 */
export const IfBlockRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/ifBlock.relationsMetadata')).IfBlockRelationsEditorMetadata();

/**
 * If block layout designer type loader
 */
export const IfBlockLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/ifBlockDesigner.component')).IfBlockDesignerSAComponent;
