import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {PeriodNodeComponent} from '../node/periodNode.component';

/**
 * Period relations metadata
 */
export class PeriodRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Period',
        description: ' period',
        group: 'Form fields',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = PeriodNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}