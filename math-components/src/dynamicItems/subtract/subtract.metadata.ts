import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Math subtract relations metadata loader
 */
export const MathSubtractRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/subtract.relationsMetadata')).MathSubtractRelationsEditorMetadata();
