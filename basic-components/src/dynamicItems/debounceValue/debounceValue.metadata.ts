import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Debounce value relations metadata loader
 */
export const DebounceValueRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/debounceValue.relationsMetadata')).DebounceValueRelationsEditorMetadata();
