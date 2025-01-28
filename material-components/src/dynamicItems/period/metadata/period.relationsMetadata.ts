import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {MaterialPeriodNodeComponent} from '../node/periodNode.component';

/**
 * Material period relations metadata
 */
export class MaterialPeriodRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Period',
        description: 'Material period',
        group: 'Material form fields',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = MaterialPeriodNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}