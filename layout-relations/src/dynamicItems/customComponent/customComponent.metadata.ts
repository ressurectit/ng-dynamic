import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {CustomComponentComponentOptions} from './customComponent.options';

/**
 * Custom component layout metadata loader
 */
export const CustomComponentLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<CustomComponentComponentOptions>> = async () => new (await import('./metadata/customComponent.layoutMetadata')).CustomComponentLayoutEditorMetadata();

/**
 * Custom component relations metadata loader
 */
export const CustomComponentRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/customComponent.relationsMetadata')).CustomComponentRelationsEditorMetadata();

/**
 * Custom component layout designer type loader
 */
export const CustomComponentLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/customComponentDesigner.component')).CustomComponentDesignerComponent;
