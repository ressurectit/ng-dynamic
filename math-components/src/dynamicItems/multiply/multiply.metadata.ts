import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Math multiply relations metadata loader
 */
export const MathMultiplyRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/multiplication.relationsMetadata')).MathMultiplyRelationsEditorMetadata();
