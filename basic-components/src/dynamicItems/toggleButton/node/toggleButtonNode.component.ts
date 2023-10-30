import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FirstUppercaseLocalizeSAPipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for toggle button
 */
@Component(
{
    selector: 'toggle-button-node',
    templateUrl: 'toggleButtonNode.component.html',
    // styleUrls: ['toggleButtonNode.component.css'],
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
        FirstUppercaseLocalizeSAPipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleButtonNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}