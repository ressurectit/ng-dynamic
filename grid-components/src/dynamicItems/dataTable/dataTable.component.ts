import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase, LayoutComponentMetadata, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {MatrixGridModule} from '@anglr/grid';
import {PromiseOr} from '@jscrpt/common';

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
        LayoutComponentRendererSADirective,
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
    //######################### protected properties - template bindings #########################

    /**
     * Definition of columns
     */
    protected colsDef: LayoutComponentMetadata[] = [];

    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onInit(): PromiseOr<void>
    {
        for(const column of this.optionsSafe.columns.options?.columns ?? [])
        {
            const template = column.options?.header.options?.content;

            if(template)
            {
                this.colsDef.push(template);
            }
        }
    }
}