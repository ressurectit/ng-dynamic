import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {MaterialDatepickerNodeComponent} from '../node/datepickerNode.component';

/**
 * Material datepicker relations metadata
 */
export class MaterialDatepickerRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Datepicker',
        description: 'Material datepicker',
        group: 'Material form fields',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = MaterialDatepickerNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}