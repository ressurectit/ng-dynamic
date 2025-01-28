import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {DataTemplateNodeComponent} from '../node/dataTemplateNode.component';

/**
 * Data template relations metadata
 */
export class DataTemplateRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Data template',
        description: 'Renders data into template',
        group: 'Data',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = DataTemplateNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}