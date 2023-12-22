import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {HostDisplayBlockStyle} from '@anglr/common';

import {GridColumnComponentOptions} from '../gridColumn.options';
import {GridColumnSAComponent} from '../gridColumn.component';

/**
 * Component used for displaying grid column designer
 */
@Component(
{
    selector: 'grid-column-designer',
    templateUrl: 'gridColumnDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridColumnDesignerSAComponent extends GridColumnSAComponent implements LayoutComponent<GridColumnComponentOptions>
{
}