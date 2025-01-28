import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {MaterialRadioNodeComponent} from '../node/radioNode.component';

/**
 * Material radio relations metadata
 */
export class MaterialRadioRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Radio',
        description: 'Material radio',
        group: 'Material form fields',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = MaterialRadioNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}