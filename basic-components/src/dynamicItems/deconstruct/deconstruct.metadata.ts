import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Deconstruct relations metadata loader
 */
export const DeconstructRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/deconstruct.relationsMetadata')).DeconstructRelationsEditorMetadata();
