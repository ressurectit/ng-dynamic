import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {TextareaNodeComponent} from '../node/textareaNode.component';

/**
 *  textarea relations metadata
 */
export class TextareaRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Textarea',
        description: 'Textarea',
        group: 'Form fields',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = TextareaNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}