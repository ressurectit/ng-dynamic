import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {MathSubtractNodeComponent} from '../node/subtractNode.component';

/**
 * Math subtract relations metadata
 */
export class MathSubtractRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Subtract',
        description: 'Subtract one number from another',
        group: 'Math',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = MathSubtractNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}