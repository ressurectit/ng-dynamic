import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {NegationNodeComponent} from '../node/negationNode.component';

/**
 * Negation relations metadata
 */
export class NegationRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Negation',
        description: 'Negates input condition',
        group: 'Logical',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = NegationNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}