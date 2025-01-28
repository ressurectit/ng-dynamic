import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {MaterialTextFieldNodeComponent} from '../node/textFieldNode.component';

/**
 * Material text field relations metadata
 */
export class MaterialTextFieldRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Text field',
        description: 'Material text field',
        group: 'Material form fields',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = MaterialTextFieldNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}