import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {ValueNodeComponent} from '../node/valueNode.component';

/**
 * Value relations metadata
 */
export class ValueRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Value',
        description: 'Initial, default value',
        group: 'Data',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = ValueNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}