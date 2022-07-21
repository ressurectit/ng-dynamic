import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Relations result relations metadata loader
 */
export const RelationsResultRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/relationsResult.relationsMetadata')).RelationsResultRelationsEditorMetadata();
