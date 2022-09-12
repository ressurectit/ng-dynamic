import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {TextareaComponentOptions} from './textarea.options';

/**
 * Textarea layout metadata loader
 */
export const TextareaLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<TextareaComponentOptions>> = async () => new (await import('./metadata/textarea.layoutMetadata')).TextareaLayoutEditorMetadata();

/**
 * Textarea relations metadata loader
 */
export const TextareaRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/textarea.relationsMetadata')).TextareaRelationsEditorMetadata();