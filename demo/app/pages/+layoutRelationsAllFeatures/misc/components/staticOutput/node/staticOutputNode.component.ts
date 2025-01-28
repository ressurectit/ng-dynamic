import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for static output
 */
@Component(
{
    selector: 'static-output-node',
    templateUrl: 'staticOutputNode.component.html',
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaticOutputNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}