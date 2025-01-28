import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputComponent, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for relations result
 */
@Component(
{
    selector: 'relations-sample-node',
    templateUrl: 'relationsResultNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsResultNodeComponent extends RelationsNodeBase implements RelationsNode
{
}