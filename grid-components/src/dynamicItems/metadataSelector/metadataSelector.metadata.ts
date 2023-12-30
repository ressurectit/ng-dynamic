import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {MetadataSelectorComponentOptions} from './metadataSelector.options';

/**
 * Metadata selector layout metadata loader
 */
export const MetadataSelectorLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<MetadataSelectorComponentOptions>> = async () => new (await import('./metadata/metadataSelector.layoutMetadata')).MetadataSelectorLayoutEditorMetadata();

/**
 * Metadata selector layout designer type loader
 */
export const MetadataSelectorLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/metadataSelectorDesigner.component')).MetadataSelectorDesignerSAComponent;