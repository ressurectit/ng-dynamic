import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {MaterialNumberFieldNodeComponent} from '../node/numberFieldNode.component';

/**
 * Material number field relations metadata
 */
export class MaterialNumberFieldRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Number field',
        description: 'Material number field',
        group: 'Material form fields',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = MaterialNumberFieldNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}