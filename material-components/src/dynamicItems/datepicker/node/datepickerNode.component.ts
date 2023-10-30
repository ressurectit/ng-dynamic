import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FirstUppercaseLocalizeSAPipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for material datepicker
 */
@Component(
{
    selector: 'material-datepicker-node',
    templateUrl: 'datepickerNode.component.html',
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
export class MaterialDatepickerNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}