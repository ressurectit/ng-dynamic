import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {ComponentInputsNodeSAComponent} from '../node/componentInputsNode.component';

/**
 * Component inputs relations metadata
 */
export class ComponentInputsRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Component inputs',
        description: 'Definition of relations component inputs',
        group: 'Component',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = ComponentInputsNodeSAComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}