import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Logical and relations metadata loader
 */
export const LogicalAndRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/logicalAnd.relationsMetadata')).LogicalAndRelationsEditorMetadata();
