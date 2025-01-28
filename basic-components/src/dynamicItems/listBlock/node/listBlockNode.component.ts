import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationsNodeHeaderSAComponent, RelationNodeOutputSAComponent} from '@anglr/dynamic/relations-editor';
import {FirstUppercaseLocalizePipe} from '@anglr/common';

import {ListBlockRelationsOptions} from '../listBlock.options';

/**
 * Relations node component for list block
 */
@Component(
{
    selector: 'list-block-node',
    templateUrl: 'listBlockNode.component.html',
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListBlockNodeSAComponent extends RelationsNodeBase<ListBlockRelationsOptions> implements RelationsNode<ListBlockRelationsOptions>
{
}