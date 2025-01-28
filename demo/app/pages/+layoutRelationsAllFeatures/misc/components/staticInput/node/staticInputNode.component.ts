import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for static input
 */
@Component(
{
    selector: 'static-input-node',
    templateUrl: 'staticInputNode.component.html',
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeOutputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaticInputNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}