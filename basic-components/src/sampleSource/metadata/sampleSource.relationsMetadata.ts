import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {SampleSourceNodeSAComponent} from '../node/sampleSourceNode.component';

/**
 * Sample source relations metadata
 */
export class SampleSourceRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Sample source',
        description: 'Sample source node',
        group: 'Sample',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = SampleSourceNodeSAComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}