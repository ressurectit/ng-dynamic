import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {StaticOutputNodeComponent} from '../node/staticOutputNode.component';

/**
 * Static ouptut relations metadata
 */
export class StaticOutputRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Static ouptut',
        description: 'Static ouptut node',
        group: 'Sample component',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = StaticOutputNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}