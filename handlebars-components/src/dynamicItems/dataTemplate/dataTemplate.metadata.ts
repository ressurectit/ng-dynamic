import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Data template relations metadata loader
 */
export const DataTemplateRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/dataTemplate.relationsMetadata')).DataTemplateRelationsEditorMetadata();
