import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputComponent, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for static input
 */
@Component(
{
    selector: 'static-input-node',
    templateUrl: 'staticInputNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeOutputComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaticInputNodeComponent extends RelationsNodeBase implements RelationsNode
{
}