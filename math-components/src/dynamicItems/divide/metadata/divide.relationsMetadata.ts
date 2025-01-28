import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {MathDivideNodeComponent} from '../node/divideNode..component';

/**
 * Math divide relations metadata
 */
export class MathDivideRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Divide',
        description: 'Divide one number by another',
        group: 'Math',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = MathDivideNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}