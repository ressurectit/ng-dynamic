import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {TextFieldNodeComponent} from '../node/textFieldNode.component';

/**
 * Text field relations metadata
 */
export class TextFieldRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Text field',
        description: 'Text field',
        group: 'Form fields',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = TextFieldNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}