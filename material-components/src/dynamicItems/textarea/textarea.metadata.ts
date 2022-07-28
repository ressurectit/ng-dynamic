import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {MaterialTextareaComponentOptions} from './textarea.options';

/**
 * Material textarea layout metadata loader
 */
export const MaterialTextareaLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<MaterialTextareaComponentOptions>> = async () => new (await import('./metadata/textarea.layoutMetadata')).MaterialTextareaLayoutEditorMetadata();