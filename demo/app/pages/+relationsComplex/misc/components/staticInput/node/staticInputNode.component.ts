import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for static input
 */
@Component(
{
    selector: 'static-input-node',
    templateUrl: 'staticInputNode.component.html',
    styleUrls: ['staticInputNode.component.scss'],
    standalone: true,
    imports:
    [
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaticInputNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}