import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {DebuggerNodeSAComponent} from '../node/debuggerNode.component';

/**
 * Debugger node relations metadata
 */
export class DebuggerNodeRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Debugger node',
        description: 'Displaying debug info for node',
        group: 'Debug',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = DebuggerNodeSAComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}