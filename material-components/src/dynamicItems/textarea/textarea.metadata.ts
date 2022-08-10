import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {MaterialTextareaComponentOptions} from './textarea.options';

/**
 * Material textarea layout metadata loader
 */
export const MaterialTextareaLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<MaterialTextareaComponentOptions>> = async () => new (await import('./metadata/textarea.layoutMetadata')).MaterialTextareaLayoutEditorMetadata();

/**
 * Material textarea relations metadata loader
 */
export const MaterialTextareaRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/textarea.relationsMetadata')).MaterialTextareaRelationsEditorMetadata();