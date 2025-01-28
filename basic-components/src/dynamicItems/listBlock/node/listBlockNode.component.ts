import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputComponent, RelationsNodeHeaderComponent, RelationNodeOutputComponent} from '@anglr/dynamic/relations-editor';
import {FirstUppercaseLocalizePipe} from '@anglr/common';

import {ListBlockRelationsOptions} from '../listBlock.options';

/**
 * Relations node component for list block
 */
@Component(
{
    selector: 'list-block-node',
    templateUrl: 'listBlockNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
        RelationNodeOutputComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListBlockNodeComponent extends RelationsNodeBase<ListBlockRelationsOptions> implements RelationsNode<ListBlockRelationsOptions>
{
}