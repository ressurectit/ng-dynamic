import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {MathMultiplyNodeComponent} from '../node/multiplyNode.component';

/**
 * Math multiply relations metadata
 */
export class MathMultiplyRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Mutliply',
        description: 'Multiply two numbers',
        group: 'Math',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = MathMultiplyNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}