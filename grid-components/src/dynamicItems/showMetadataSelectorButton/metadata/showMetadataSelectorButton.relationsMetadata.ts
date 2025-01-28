import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {ShowMetadataSelectorButtonNodeComponent} from '../node/showMetadataSelectorButtonNode.component';

/**
 * Show metadata selector button relations metadata
 */
export class ShowMetadataSelectorButtonRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Show metadata selector button',
        description: 'Button displaying metadata selection',
        group: 'Grid',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = ShowMetadataSelectorButtonNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}