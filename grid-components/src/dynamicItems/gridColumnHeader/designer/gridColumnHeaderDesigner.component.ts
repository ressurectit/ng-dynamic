import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {HostDisplayBlockStyle} from '@anglr/common';

import {GridColumnHeaderComponentOptions} from '../gridColumnHeader.options';
import {GridColumnHeaderSAComponent} from '../gridColumnHeader.component';

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
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridColumnHeaderDesignerSAComponent extends GridColumnHeaderSAComponent implements LayoutComponent<GridColumnHeaderComponentOptions>
{
}