import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FirstUppercaseLocalizeSAPipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for material textField
 */
@Component(
{
    selector: 'material-text-field-node',
    templateUrl: 'textFieldNode.component.html',
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
        FirstUppercaseLocalizeSAPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialTextFieldNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}