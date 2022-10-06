import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {PlaceholderContainerComponentOptions} from './placeholderContainer.options';

/**
 * Placeholder container layout metadata loader
 */
export const PlaceholderContainerLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<PlaceholderContainerComponentOptions>> = async () => new (await import('./metadata/placeholderContainer.layoutMetadata')).PlaceholderContainerLayoutEditorMetadata();
