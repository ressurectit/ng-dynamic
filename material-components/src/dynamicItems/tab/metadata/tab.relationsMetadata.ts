import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {MaterialTabNodeComponent} from '../node/tabNode.component';

/**
 * Material tab relations metadata
 */
export class MaterialTabRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Tab',
        description: 'Material tab',
        group: 'Material',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = MaterialTabNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}