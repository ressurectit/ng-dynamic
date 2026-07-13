import {Component} from '@angular/core';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeInputComponent, RelationNodeOutputComponent, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for material datepicker
 */
@Component(
{
    selector: 'material-datepicker-node',
    templateUrl: 'datepickerNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
        RelationNodeOutputComponent,
        FirstUppercaseLocalizePipe
    ],
})
export class MaterialDatepickerNodeComponent extends RelationsNodeBase implements RelationsNode
{
}