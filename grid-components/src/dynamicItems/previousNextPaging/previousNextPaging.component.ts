import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {Grid, PluginDescription, PreviousNextPagingSAComponent as GridPreviousNextPaging, PreviousNextPagingOptions} from '@anglr/grid';
import {RecursivePartial} from '@jscrpt/common';

import {PreviousNextPagingComponentOptions} from './previousNextPaging.options';
import {PreviousNextPagingLayoutDesignerTypeLoader, PreviousNextPagingLayoutMetadataLoader} from './previousNextPaging.metadata';
import {GridPluginComponent} from '../../interfaces';

/**
 * Component used for displaying previous next paging
 */
@Component(
{
    selector: 'previous-next-paging',
    template: '',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorDesignerType(PreviousNextPagingLayoutDesignerTypeLoader)
@LayoutEditorMetadata(PreviousNextPagingLayoutMetadataLoader)
export class PreviousNextPagingSAComponent extends LayoutComponentBase<PreviousNextPagingComponentOptions> implements GridPluginComponent<GridPreviousNextPaging, PreviousNextPagingComponentOptions, PreviousNextPagingOptions>
{
    //######################### protected fields #########################

    /**
     * Instance of grid
     */
    protected grid: Grid|undefined|null;

    //######################### public properties - implementation of GridDataLoaderPlugin #########################
    
    /**
     * @inheritdoc
     */
    public pluginDescription: PluginDescription<GridPreviousNextPaging, RecursivePartial<PreviousNextPagingOptions>> =
    {
        instance: null,
        instanceCallback: null,
        options:
        {
            initialItemsPerPage: 15,
            initialPage: 1,
            itemsPerPageValues: [15, 30, 60],
        },
        type: GridPreviousNextPaging,
    };

    //######################### public methods - implementation of GridDataLoaderPlugin #########################
    
    /**
     * @inheritdoc
     */
    public setGridInstance(grid: Grid): void
    {
        this.grid = grid;
    }

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): void
    {
        if(this.pluginDescription.options)
        {
            this.pluginDescription.options.initialItemsPerPage = this.optionsSafe.initialItemsPerPage ?? 15;
        }
    }
}