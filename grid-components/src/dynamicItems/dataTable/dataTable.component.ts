import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {DataTableComponentOptions} from './dataTable.options';
import {DataTableLayoutMetadataLoader} from './dataTable.metadata';

/**
 * Component used for displaying data table
 */
@Component(
{
    selector: 'data-table',
    templateUrl: 'dataTable.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorMetadata(DataTableLayoutMetadataLoader)
export class DataTableSAComponent extends LayoutComponentBase<DataTableComponentOptions> implements LayoutComponent<DataTableComponentOptions>
{
}