import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {MaterialSelectNodeComponent} from '../node/selectNode.component';

/**
 * Material select relations metadata
 */
export class MaterialSelectRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Select',
        description: 'Material select',
        group: 'Material form fields',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = MaterialSelectNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}