import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {CheckboxNodeComponent} from '../node/checkboxNode.component';

/**
 * Checkbox relations metadata
 */
export class CheckboxRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Checkbox',
        description: 'Checkbox',
        group: 'Form fields',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = CheckboxNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}