import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for material datepicker
 */
@Component(
{
    selector: 'material-datepicker-node',
    templateUrl: 'datepickerNode.component.html',
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
        FirstUppercaseLocalizePipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialDatepickerNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}