import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputComponent, RelationNodeOutputComponent, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';
import {FirstUppercaseLocalizePipe} from '@anglr/common';

/**
 * Relations node component for empty
 */
@Component(
{
    selector: 'empty-node',
    templateUrl: 'emptyNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
        RelationNodeOutputComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyNodeComponent extends RelationsNodeBase implements RelationsNode
{
}