import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for relations result
 */
@Component(
{
    selector: 'relations-sample-node',
    templateUrl: 'relationsResultNode.component.html',
    // styleUrls: ['relationsResultNode.component.scss'],
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsResultNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}