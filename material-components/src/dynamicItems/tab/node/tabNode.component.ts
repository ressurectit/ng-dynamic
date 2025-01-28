import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeInputComponent, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for material tab
 */
@Component(
{
    selector: 'material-tab-node',
    templateUrl: 'tabNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialTabNodeComponent extends RelationsNodeBase implements RelationsNode
{
}