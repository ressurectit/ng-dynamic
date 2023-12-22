import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {HostFlexRowStyle} from '@anglr/common';

import {GridColumnsComponentOptions} from '../gridColumns.options';
import {GridColumnsSAComponent} from '../gridColumns.component';

/**
 * Component used for displaying grid columns designer
 */
@Component(
{
    selector: 'grid-columns-designer',
    templateUrl: 'gridColumnsDesigner.component.html',
    styles: [HostFlexRowStyle],
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridColumnsDesignerSAComponent extends GridColumnsSAComponent implements LayoutComponent<GridColumnsComponentOptions>
{
}