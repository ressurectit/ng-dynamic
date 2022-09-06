import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for not found
 */
@Component(
{
    selector: 'not-found-node',
    templateUrl: 'notFoundNode.component.html',
    styleUrls: ['notFoundNode.component.css'],
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}