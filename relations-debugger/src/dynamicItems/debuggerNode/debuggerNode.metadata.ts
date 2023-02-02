import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Debugger node relations metadata loader
 */
export const DebuggerNodeRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/debuggerNode.relationsMetadata')).DebuggerNodeRelationsEditorMetadata();
