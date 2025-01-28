import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {FirstNonNullNodeComponent} from '../node/firstNonNullNode.component';

/**
 * First non null relations metadata
 */
export class FirstNonNullRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'First non null',
        description: 'Returns first input that is set (non null)',
        group: 'Data',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = FirstNonNullNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}