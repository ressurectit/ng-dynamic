import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {NumberFieldNodeComponent} from '../node/numberFieldNode.component';

/**
 *  number field relations metadata
 */
export class NumberFieldRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Number field',
        description: 'Number field',
        group: 'Form fields',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = NumberFieldNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}