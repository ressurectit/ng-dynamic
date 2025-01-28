import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {StateNodeComponent} from '../node/stateNode.component';

/**
 * State relations metadata
 */
export class StateRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'State',
        description: 'Node that allows storing and manipulation with statefull object',
        group: 'Data',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = StateNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}