import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for html block
 */
@Component(
{
    selector: 'html-block-node',
    templateUrl: 'htmlBlockNode.component.html',
    // styleUrls: ['htmlBlockNode.component.css'],
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HtmlBlockNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}