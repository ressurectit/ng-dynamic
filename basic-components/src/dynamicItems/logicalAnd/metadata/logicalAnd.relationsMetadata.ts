import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {LogicalAndNodeComponent} from '../node/logicalAndNode.component';

/**
 * Logical and relations metadata
 */
export class LogicalAndRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Logical AND',
        description: 'Logical AND operation',
        group: 'Logical',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = LogicalAndNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}