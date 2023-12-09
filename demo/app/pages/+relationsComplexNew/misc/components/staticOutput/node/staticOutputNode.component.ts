import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for static output
 */
@Component(
{
    selector: 'static-output-node',
    templateUrl: 'staticOutputNode.component.html',
    // styleUrls: ['staticOutputNode.component.scss'],
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaticOutputNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}