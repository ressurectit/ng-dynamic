import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {IfBlockNodeComponent} from '../node/ifBlockNode.component';

/**
 * If block relations metadata
 */
export class IfBlockRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'If',
        description: 'If block - conditionally displays content',
        group: 'Layout',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = IfBlockNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}