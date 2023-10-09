import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {MatchNodeSAComponent} from '../node/matchNode.component';

/**
 * Match relations metadata
 */
export class MatchRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Match',
        description: 'Compares two values',
        group: 'Logical',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = MatchNodeSAComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}