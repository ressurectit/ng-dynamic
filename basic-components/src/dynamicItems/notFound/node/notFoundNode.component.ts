import {Component} from '@angular/core';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for not found
 */
@Component(
{
    selector: 'not-found-node',
    templateUrl: 'notFoundNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        FirstUppercaseLocalizePipe,
    ],
})
export class NotFoundNodeComponent extends RelationsNodeBase implements RelationsNode
{
}