import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {RestNodeComponent} from '../node/restNode.component';

/**
 * Rest relations metadata
 */
export class RestRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Rest',
        description: 'Restfull requests',
        group: 'Http',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = RestNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}