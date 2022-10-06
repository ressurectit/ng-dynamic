import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {PlaceholderContainerComponentOptions} from './placeholderContainer.options';

/**
 * Placeholder container layout metadata loader
 */
export const PlaceholderContainerLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<PlaceholderContainerComponentOptions>> = async () => new (await import('./metadata/placeholderContainer.layoutMetadata')).PlaceholderContainerLayoutEditorMetadata();

/**
 * Placeholder container layout designer type loader
 */
export const PlaceholderContainerLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/placeholderContainerDesigner.component')).PlaceholderContainerDesignerSAComponent;
