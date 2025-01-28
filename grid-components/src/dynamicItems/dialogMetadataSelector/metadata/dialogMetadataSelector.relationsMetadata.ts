import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {DialogMetadataSelectorNodeComponent} from '../node/dialogMetadataSelectorNode.component';

/**
 * Dialog metadata selector relations metadata
 */
export class DialogMetadataSelectorRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Dialog metadata selector',
        description: 'Dialog metadata selector grid plugin for metadata selection',
        group: 'Grid',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = DialogMetadataSelectorNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}