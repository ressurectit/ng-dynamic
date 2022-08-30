import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {CustomComponentNodeSAComponent} from '../node/customComponentNode.component';

/**
 * Custom component relations metadata
 */
export class CustomComponentRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Custom component',
        description: 'Custom component - allows displaying of custom components',
        group: 'Component',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = CustomComponentNodeSAComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}