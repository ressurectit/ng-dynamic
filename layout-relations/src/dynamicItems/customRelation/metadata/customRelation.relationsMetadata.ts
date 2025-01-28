import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {CustomRelationNodeComponent} from '../node/customRelationNode.component';

/**
 * Custom relation relations metadata
 */
export class CustomRelationRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        group: 'Relations',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = CustomRelationNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}