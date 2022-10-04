import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Sync values relations metadata loader
 */
export const SyncValuesRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/syncValues.relationsMetadata')).SyncValuesRelationsEditorMetadata();
