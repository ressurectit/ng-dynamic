import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationsNodeHeaderComponent, RelationNodeOutputComponent} from '@anglr/dynamic/relations-editor';
import {FirstUppercaseLocalizePipe} from '@anglr/common';

import {GridColumnsRelationsOptions} from '../gridColumns.options';

/**
 * Relations node component for grid columns
 */
@Component(
{
    selector: 'grid-columns-node',
    templateUrl: 'gridColumnsNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeOutputComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridColumnsNodeComponent extends RelationsNodeBase<GridColumnsRelationsOptions> implements RelationsNode<GridColumnsRelationsOptions>
{
}