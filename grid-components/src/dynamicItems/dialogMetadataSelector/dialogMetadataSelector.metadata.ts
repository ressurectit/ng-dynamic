import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {DialogMetadataSelectorComponentOptions} from './dialogMetadataSelector.options';

/**
 * Dialog metadata selector layout metadata loader
 */
export const DialogMetadataSelectorLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<DialogMetadataSelectorComponentOptions>> = async () => new (await import('./metadata/dialogMetadataSelector.layoutMetadata')).DialogMetadataSelectorLayoutEditorMetadata();

/**
 * Dialog metadata selector relations metadata loader
 */
export const DialogMetadataSelectorRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/dialogMetadataSelector.relationsMetadata')).DialogMetadataSelectorRelationsEditorMetadata();

/**
 * Dialog metadata selector layout designer type loader
 */
export const DialogMetadataSelectorLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/dialogMetadataSelectorDesigner.component')).DialogMetadataSelectorDesignerComponent;