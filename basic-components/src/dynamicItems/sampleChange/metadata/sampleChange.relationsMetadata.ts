import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {SampleChangeNodeSAComponent} from '../node/sampleChangeNode.component';

/**
 * Sample change relations metadata
 */
export class SampleChangeRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Sample change',
        description: 'Sample change node',
        group: 'Sample',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = SampleChangeNodeSAComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}