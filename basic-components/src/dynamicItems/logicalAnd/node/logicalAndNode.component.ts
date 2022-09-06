import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

import {LogicalAndRelationsOptions} from '../logicalAnd.options';

/**
 * Logical and node component for negation
 */
@Component(
{
    selector: 'logical-and-node',
    templateUrl: 'logicalAndNode.component.html',
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogicalAndNodeSAComponent extends RelationsNodeBase<LogicalAndRelationsOptions> implements RelationsNode<LogicalAndRelationsOptions>
{
}