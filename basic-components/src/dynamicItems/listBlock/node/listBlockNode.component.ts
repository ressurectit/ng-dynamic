import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationsNodeHeaderSAComponent, RelationNodeOutputSAComponent} from '@anglr/dynamic/relations-editor';

import {ListBlockRelationsOptions} from '../listBlock.options';

/**
 * Relations node component for list block
 */
@Component(
{
    selector: 'list-block-node',
    templateUrl: 'listBlockNode.component.html',
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListBlockNodeSAComponent extends RelationsNodeBase<ListBlockRelationsOptions> implements RelationsNode<ListBlockRelationsOptions>
{
}