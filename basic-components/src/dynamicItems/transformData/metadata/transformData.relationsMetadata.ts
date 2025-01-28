import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {TransformDataNodeComponent} from '../node/transformDataNode.component';

/**
 * Transform data relations metadata
 */
export class TransformDataRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Transform data',
        description: 'Code that allows data tranformation',
        group: 'Data',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = TransformDataNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}