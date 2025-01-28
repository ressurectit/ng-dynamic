import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {GridColumnsNodeComponent} from '../node/gridColumnsNode.component';

/**
 * Grid columns relations metadata
 */
export class GridColumnsRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Grid row context',
        description: 'Grid row context for each data row',
        group: 'Grid',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = GridColumnsNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}