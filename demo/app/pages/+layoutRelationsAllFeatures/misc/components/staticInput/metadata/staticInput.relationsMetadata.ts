import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {StaticInputNodeSAComponent} from '../node/staticInputNode.component';

/**
 * Static input relations metadata
 */
export class StaticInputRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Static input',
        description: 'Static input node',
        group: 'Sample component',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = StaticInputNodeSAComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}