import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Custom relation relations metadata loader
 */
export const CustomRelationRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/customRelation.relationsMetadata')).CustomRelationRelationsEditorMetadata();
