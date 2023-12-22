import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {MatrixGridModule} from '@anglr/grid';

import {DataTableComponentOptions} from './dataTable.options';
import {DataTableLayoutDesignerTypeLoader, DataTableLayoutMetadataLoader} from './dataTable.metadata';

/**
 * Component used for displaying data table
 */
@Component(
{
    selector: 'data-table',
    templateUrl: 'dataTable.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        MatrixGridModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<DataTableComponentOptions>(options => 
{
    if(!options)
    {
        return [];
    }

    return [options.columns, options.dataLoader];
})
@LayoutEditorDesignerType(DataTableLayoutDesignerTypeLoader)
@LayoutEditorMetadata(DataTableLayoutMetadataLoader)
export class DataTableSAComponent extends LayoutComponentBase<DataTableComponentOptions> implements LayoutComponent<DataTableComponentOptions>
{
}