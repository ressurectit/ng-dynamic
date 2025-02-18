import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {ToggleButtonNodeComponent} from '../node/toggleButtonNode.component';

/**
 * Toggle button relations metadata
 */
export class ToggleButtonRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Toggle button',
        description: 'Toggle button',
        group: 'Buttons',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = ToggleButtonNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}