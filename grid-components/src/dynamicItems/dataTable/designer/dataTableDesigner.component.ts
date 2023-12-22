import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
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
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableDesignerSAComponent extends DataTableSAComponent implements LayoutComponent<DataTableComponentOptions>
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onInit(): void
    {
        this.optionsSafe.columns ??=
        {
            id: `gridColumns-${generateId(10)}`,
            name: 'gridColumns',
            package: 'grid-components',
            displayName: 'columns',
            options: {},
        };
    }
}