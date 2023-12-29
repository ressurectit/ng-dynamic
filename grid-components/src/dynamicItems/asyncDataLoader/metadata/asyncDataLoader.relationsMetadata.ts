import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {AsyncDataLoaderNodeSAComponent} from '../node/asyncDataLoaderNode.component';

/**
 * Async data loader relations metadata
 */
export class AsyncDataLoaderRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Async data loader',
        description: 'Async data loader grid plugin for obtaining data',
        group: 'Grid',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = AsyncDataLoaderNodeSAComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}