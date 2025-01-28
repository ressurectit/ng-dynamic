import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {RichTextSourceNodeComponent} from '../node/richTextSourceNode.component';

/**
 * Rich text source relations metadata
 */
export class RichTextSourceRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Rich text source',
        description: 'Provides rich text source node',
        group: 'Texts',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = RichTextSourceNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}