import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Static output relations metadata loader
 */
export const StaticOutputRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/staticOutput.relationsMetadata')).StaticOutputRelationsEditorMetadata();
