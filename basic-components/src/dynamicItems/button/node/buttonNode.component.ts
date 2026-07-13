import {Component} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputComponent, RelationNodeOutputComponent, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';
import {FirstUppercaseLocalizePipe} from '@anglr/common';

/**
 * Relations node component for button
 */
@Component(
{
    selector: 'button-node',
    templateUrl: 'buttonNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
        RelationNodeOutputComponent,
        FirstUppercaseLocalizePipe,
    ],
})
export class ButtonNodeComponent extends RelationsNodeBase implements RelationsNode
{
}