import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';
import {FirstUppercaseLocalizeSAPipe} from '@anglr/common';

/**
 * Relations node component for empty
 */
@Component(
{
    selector: 'empty-node',
    templateUrl: 'emptyNode.component.html',
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
export class EmptyNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}