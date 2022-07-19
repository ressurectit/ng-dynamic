import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Sample source relations metadata loader
 */
export const SampleSourceRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/sampleSource.relationsMetadata')).SampleSourceRelationsEditorMetadata();
