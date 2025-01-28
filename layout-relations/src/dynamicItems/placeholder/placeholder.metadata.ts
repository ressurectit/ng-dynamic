import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {PlaceholderComponentOptions} from './placeholder.options';

/**
 * Placeholder layout metadata loader
 */
export const PlaceholderLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<PlaceholderComponentOptions>> = async () => new (await import('./metadata/placeholder.layoutMetadata')).PlaceholderLayoutEditorMetadata();

/**
 * Placeholder layout designer type loader
 */
export const PlaceholderLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/placeholderDesigner.component')).PlaceholderDesignerComponent;
