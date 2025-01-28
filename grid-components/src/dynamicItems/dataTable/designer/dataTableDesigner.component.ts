import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {LayoutDesignerDirective} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {generateId} from '@jscrpt/common';

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
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableDesignerSAComponent extends DataTableSAComponent implements LayoutComponent<DataTableComponentOptions>
{
    //######################### protected properties #########################

    /**
     * Instance of designer component
     */
    protected designer: LayoutDesignerDirective = inject(LayoutDesignerDirective);

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onInit(): void
    {
        this.designer.metadataSafe.scope ??= generateId(10);

        this.optionsSafe.columns ??=
        {
            id: `gridColumns-${generateId(10)}`,
            name: 'gridColumns',
            package: 'grid-components',
            displayName: 'columns',
            options:
            {
                columns: [],
            },
            scope: this.designer.metadataSafe.scope,
        };

        this.optionsSafe.dataLoader ??=
        {
            id: `dataLoader-${generateId(10)}`,
            name: 'dataLoader',
            package: 'grid-components',
            displayName: 'data loader',
            options:
            {
                plugin: null,
            },
        };

        this.optionsSafe.paging ??=
        {
            id: `paging-${generateId(10)}`,
            name: 'paging',
            package: 'grid-components',
            displayName: 'paging',
            options:
            {
                plugin: null,
            },
        };

        this.optionsSafe.metadataSelector ??=
        {
            id: `metadataSelector-${generateId(10)}`,
            name: 'metadataSelector',
            package: 'grid-components',
            displayName: 'metadata selector',
            options:
            {
                plugin: null,
            },
        };
    }
}