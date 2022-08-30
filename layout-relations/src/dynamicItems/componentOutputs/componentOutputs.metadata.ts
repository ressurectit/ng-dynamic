import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Component outputs relations metadata loader
 */
export const ComponentOutputsRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/componentOutputs.relationsMetadata')).ComponentOutputsRelationsEditorMetadata();

