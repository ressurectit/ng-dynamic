import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent, RELATIONS_NODE_DESTROY_SUBJECT_PROVIDER} from '@anglr/dynamic/relations-editor';

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
    providers:
    [
        RELATIONS_NODE_DESTROY_SUBJECT_PROVIDER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaticOutputNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}