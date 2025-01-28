import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {LogicalOrNodeComponent} from '../node/logicalOrNode.component';

/**
 * Logical or relations metadata
 */
export class LogicalOrRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Logical OR',
        description: 'Logical OR operation',
        group: 'Logical',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = LogicalOrNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}