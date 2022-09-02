import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

import {ForBlockRelationsOptions} from '../forBlock.options';

/**
 * Relations node component for for block
 */
@Component(
{
    selector: 'for-block-node',
    templateUrl: 'forBlockNode.component.html',
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForBlockNodeSAComponent extends RelationsNodeBase<ForBlockRelationsOptions> implements RelationsNode<ForBlockRelationsOptions>
{
}