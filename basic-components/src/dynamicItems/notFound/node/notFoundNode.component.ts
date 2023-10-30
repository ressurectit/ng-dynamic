import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FirstUppercaseLocalizeSAPipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for not found
 */
@Component(
{
    selector: 'not-found-node',
    templateUrl: 'notFoundNode.component.html',
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        FirstUppercaseLocalizeSAPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}