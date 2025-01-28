import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {RelationsSampleClickNodeComponent} from '../node/relationsSampleClickNode.component';

/**
 * Relations sample click relations metadata
 */
export class RelationsSampleClickRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Relations sample click',
        description: 'Relations sample click node',
        group: 'Sample component',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = RelationsSampleClickNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}