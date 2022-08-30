import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationsNodeHeaderSAComponent, RelationNodeOutputSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for custom component
 */
@Component(
{
    selector: 'custom-component-node',
    templateUrl: 'customComponentNode.component.html',
    // styleUrls: ['customComponentNode.component.css'],
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomComponentNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}