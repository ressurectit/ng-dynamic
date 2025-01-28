import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {DatepickerNodeComponent} from '../node/datepickerNode.component';

/**
 *  datepicker relations metadata
 */
export class DatepickerRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Datepicker',
        description: 'Datepicker',
        group: 'Form fields',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = DatepickerNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}