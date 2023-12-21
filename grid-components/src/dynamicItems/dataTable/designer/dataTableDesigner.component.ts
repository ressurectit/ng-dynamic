import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {HostDisplayBlockStyle} from '@anglr/common';

import {DataTableComponentOptions} from '../dataTable.options';
import {DataTableSAComponent} from '../dataTable.component';

/**
 * Component used for displaying data table designer
 */
@Component(
{
    selector: 'data-table-designer',
    templateUrl: 'dataTableDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableDesignerSAComponent extends DataTableSAComponent implements LayoutComponent<DataTableComponentOptions>
{
}