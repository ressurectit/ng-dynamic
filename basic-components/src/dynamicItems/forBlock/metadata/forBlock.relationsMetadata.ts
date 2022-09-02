import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {ForBlockNodeSAComponent} from '../node/forBlockNode.component';

/**
 * For block relations metadata
 */
export class ForBlockRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'For',
        description: 'For block - displays template in array',
        group: 'Layout',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = ForBlockNodeSAComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}