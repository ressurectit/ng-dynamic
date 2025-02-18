import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {CustomComponentNodeComponent} from '../node/customComponentNode.component';

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
        group: 'Components',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = CustomComponentNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}