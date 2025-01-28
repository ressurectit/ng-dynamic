import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {ComponentOutputsNodeComponent} from '../node/componentOutputsNode.component';

/**
 * Component outputs relations metadata
 */
export class ComponentOutputsRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Component outputs',
        description: 'Definition of relations component outputs',
        group: 'Component',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = ComponentOutputsNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}