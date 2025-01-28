import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {ListBlockNodeComponent} from '../node/listBlockNode.component';

/**
 * List block relations metadata
 */
export class ListBlockRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'List',
        description: 'List block - displays template in array',
        group: 'Layout',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = ListBlockNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}