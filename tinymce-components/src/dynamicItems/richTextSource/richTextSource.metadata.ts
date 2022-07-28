import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Rich text source relations metadata loader
 */
export const RichTextSourceRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/richTextSource.relationsMetadata')).RichTextSourceRelationsEditorMetadata();
