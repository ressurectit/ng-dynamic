import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {MergeNodeComponent} from '../node/mergeNode.component';

/**
 * Merge relations metadata
 */
export class MergeRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Merge',
        description: 'Allows constructing of object merged of inputs',
        group: 'Data',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = MergeNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}