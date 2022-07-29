import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent, RELATIONS_NODE_DESTROY_SUBJECT_PROVIDER, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for button
 */
@Component(
{
    selector: 'button-node',
    templateUrl: 'buttonNode.component.html',
    // styleUrls: ['buttonNode.component.css'],
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
export class ButtonNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}