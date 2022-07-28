import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {ButtonNodeSAComponent} from '../node/buttonNode.component';

/**
 * Button relations metadata
 */
export class ButtonRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Button',
        description: 'Simple button',
        group: 'Buttons',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = ButtonNodeSAComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}