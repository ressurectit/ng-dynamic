import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent} from '@anglr/dynamic/relations-editor';

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
        RelationNodeInputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IfBlockNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}