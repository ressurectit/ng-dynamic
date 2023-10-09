import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Match relations metadata loader
 */
export const MatchRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/match.relationsMetadata')).MatchRelationsEditorMetadata();
