import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {TriggerNodeComponent} from '../node/triggerNode.component';

/**
 * Trigger relations metadata
 */
export class TriggerRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Trigger',
        description: 'Allows sending data on trigger input',
        group: 'Data',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = TriggerNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}