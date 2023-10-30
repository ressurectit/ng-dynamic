import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FirstUppercaseLocalizeSAPipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for material radio
 */
@Component(
{
    selector: 'material-radio-node',
    templateUrl: 'radioNode.component.html',
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
export class MaterialRadioNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}