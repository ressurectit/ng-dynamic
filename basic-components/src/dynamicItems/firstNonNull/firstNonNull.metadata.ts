import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * First non null relations metadata loader
 */
export const FirstNonNullRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/firstNonNull.relationsMetadata')).FirstNonNullRelationsEditorMetadata();
