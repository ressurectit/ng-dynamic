import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Component inputs relations metadata loader
 */
export const ComponentInputsRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/componentInputs.relationsMetadata')).ComponentInputsRelationsEditorMetadata();

