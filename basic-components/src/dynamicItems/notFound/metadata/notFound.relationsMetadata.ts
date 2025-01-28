import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsNode} from '@anglr/dynamic/relations-editor';

import {NotFoundNodeComponent} from '../node/notFoundNode.component';

/**
 * Not found relations metadata
 */
export class NotFoundRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = NotFoundNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}