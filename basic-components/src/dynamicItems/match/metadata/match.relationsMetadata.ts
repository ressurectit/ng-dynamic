import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {MatchNodeComponent} from '../node/matchNode.component';

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
    public nodeDefinition: Type<RelationsNode> = MatchNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}