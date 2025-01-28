import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererDirective} from '@anglr/dynamic/layout';
import {HostDisplayBlockStyle} from '@anglr/common';

import {GridColumnHeaderComponentOptions} from '../gridColumnHeader.options';
import {GridColumnHeaderComponent} from '../gridColumnHeader.component';

/**
 * Component used for displaying grid column header designer
 */
@Component(
{
    selector: 'grid-column-header-designer',
    templateUrl: 'gridColumnHeaderDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    imports:
    [
        LayoutComponentRendererDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridColumnHeaderDesignerComponent extends GridColumnHeaderComponent implements LayoutComponent<GridColumnHeaderComponentOptions>
{
}