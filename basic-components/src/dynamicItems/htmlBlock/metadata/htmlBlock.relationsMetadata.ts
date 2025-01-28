import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {HtmlBlockNodeComponent} from '../node/htmlBlockNode.component';

/**
 * Html block relations metadata
 */
export class HtmlBlockRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Html block',
        description: 'Html block - displays html or string',
        group: 'Data',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = HtmlBlockNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}