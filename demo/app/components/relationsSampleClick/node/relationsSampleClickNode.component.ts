import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputComponent, RelationNodeOutputComponent, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for relations sample click
 */
@Component(
{
    selector: 'relations-sample-click-node',
    templateUrl: 'relationsSampleClickNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
        RelationNodeOutputComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsSampleClickNodeComponent extends RelationsNodeBase implements RelationsNode
{
}