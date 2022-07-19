import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Sample change relations metadata loader
 */
export const SampleChangeRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/sampleChange.relationsMetadata')).SampleChangeRelationsEditorMetadata();
