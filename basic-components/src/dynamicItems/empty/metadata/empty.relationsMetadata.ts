import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {EmptyNodeComponent} from '../node/emptyNode.component';

/**
 * Empty relations metadata
 */
export class EmptyRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Empty',
        description: 'Checks whether input value is empty',
        group: 'Logical',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = EmptyNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}