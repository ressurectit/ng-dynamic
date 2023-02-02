import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {PureRelationsComponent} from '@anglr/dynamic/relations';

import {DebuggerNodeRelationsMetadataLoader} from './debuggerNode.metadata';

/**
 * Debugger node relations component, not real relations
 */
@PureRelationsComponent()
@RelationsEditorMetadata(DebuggerNodeRelationsMetadataLoader)
export class DebuggerNodeRelations
{
}