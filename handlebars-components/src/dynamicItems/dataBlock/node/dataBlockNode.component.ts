import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for data block
 */
@Component(
{
    selector: 'data-block-node',
    templateUrl: 'dataBlockNode.component.html',
    // styleUrls: ['dataBlockNode.component.css'],
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataBlockNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}