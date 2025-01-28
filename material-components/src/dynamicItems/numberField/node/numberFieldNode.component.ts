import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeInputComponent, RelationNodeOutputComponent, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for material checkbox
 */
@Component(
{
    selector: 'material-number-field-node',
    templateUrl: 'numberFieldNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
        RelationNodeOutputComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialNumberFieldNodeComponent extends RelationsNodeBase implements RelationsNode
{
}