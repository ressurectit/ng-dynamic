import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputComponent, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for static output
 */
@Component(
{
    selector: 'static-output-node',
    templateUrl: 'staticOutputNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaticOutputNodeComponent extends RelationsNodeBase implements RelationsNode
{
}