import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RELATIONS_NODE_DESTROY_SUBJECT_PROVIDER, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for if block
 */
@Component(
{
    selector: 'if-block-node',
    templateUrl: 'ifBlockNode.component.html',
    styleUrls: ['ifBlockNode.component.css'],
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
    ],
    providers:
    [
        RELATIONS_NODE_DESTROY_SUBJECT_PROVIDER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IfBlockNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}