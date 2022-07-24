import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Relations sample click relations metadata loader
 */
export const RelationsSampleClickRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/relationsSampleClick.relationsMetadata')).RelationsSampleClickRelationsEditorMetadata();
