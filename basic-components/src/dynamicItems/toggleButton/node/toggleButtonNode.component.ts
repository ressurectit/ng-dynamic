import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for toggle button
 */
@Component(
{
    selector: 'toggle-button-node',
    templateUrl: 'toggleButtonNode.component.html',
    styleUrls: ['toggleButtonNode.component.css'],
    standalone: true,
    imports:
    [
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleButtonNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}