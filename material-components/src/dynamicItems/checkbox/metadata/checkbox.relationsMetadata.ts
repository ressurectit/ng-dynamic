import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {MaterialCheckboxNodeComponent} from '../node/checkboxNode.component';

/**
 * Material checkbox relations metadata
 */
export class MaterialCheckboxRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Checkbox',
        description: 'Material checkbox',
        group: 'Material form fields',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = MaterialCheckboxNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}