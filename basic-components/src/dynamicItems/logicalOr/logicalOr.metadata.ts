import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Logical or relations metadata loader
 */
export const LogicalOrRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/logicalOr.relationsMetadata')).LogicalOrRelationsEditorMetadata();
