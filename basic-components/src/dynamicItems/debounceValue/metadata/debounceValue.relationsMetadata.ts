import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {DebounceValueNodeComponent} from '../node/debounceValueNode.component';

/**
 * Debounce value relations metadata
 */
export class DebounceValueRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Debounce value',
        description: 'Debounce value by specific time',
        group: 'Data',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = DebounceValueNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}