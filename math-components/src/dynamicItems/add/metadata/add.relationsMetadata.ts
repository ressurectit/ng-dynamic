import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {MathAddNodeComponent} from '../node/addNode.component';

/**
 * Math add relations metadata
 */
export class MathAddRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Sum',
        description: 'Sums two numbers',
        group: 'Math',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = MathAddNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}