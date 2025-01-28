import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {SelectNodeComponent} from '../node/selectNode.component';

/**
 * Select relations metadata
 */
export class SelectRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Select',
        description: 'Dropdown',
        group: 'Form fields',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = SelectNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}