import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {RelationsResultNodeComponent} from '../node/relationsResultNode.component';

/**
 * Relations result relations metadata
 */
export class RelationsResultRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Relations result',
        description: 'Relations result node',
        group: 'Sample component',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = RelationsResultNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}