import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationsNodeHeaderSAComponent, RelationNodeOutputSAComponent} from '@anglr/dynamic/relations-editor';
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
        RelationsNodeHeaderSAComponent,
        RelationNodeOutputSAComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridColumnsNodeSAComponent extends RelationsNodeBase<GridColumnsRelationsOptions> implements RelationsNode<GridColumnsRelationsOptions>
{
}