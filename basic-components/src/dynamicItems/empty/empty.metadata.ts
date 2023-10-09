import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Empty relations metadata loader
 */
export const EmptyRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/empty.relationsMetadata')).EmptyRelationsEditorMetadata();
