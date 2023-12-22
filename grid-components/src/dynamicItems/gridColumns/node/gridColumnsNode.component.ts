import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationsNodeHeaderSAComponent, RelationNodeOutputSAComponent} from '@anglr/dynamic/relations-editor';
import {FirstUppercaseLocalizeSAPipe} from '@anglr/common';

import {GridColumnsRelationsOptions} from '../gridColumns.options';

/**
 * Relations node component for grid columns
 */
@Component(
{
    selector: 'grid-columns-node',
    templateUrl: 'gridColumnsNode.component.html',
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeOutputSAComponent,
        FirstUppercaseLocalizeSAPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridColumnsNodeSAComponent extends RelationsNodeBase<GridColumnsRelationsOptions> implements RelationsNode<GridColumnsRelationsOptions>
{
}