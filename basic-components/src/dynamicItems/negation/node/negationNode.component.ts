import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent, RELATIONS_NODE_DESTROY_SUBJECT_PROVIDER} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for negation
 */
@Component(
{
    selector: 'negation-node',
    templateUrl: 'negationNode.component.html',
    // styleUrls: ['negationNode.component.css'],
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
export class NegationNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}