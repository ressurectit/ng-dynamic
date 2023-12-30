import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {Grid, PluginDescription, BasicPagingSAComponent as GridBasicPaging, BasicPagingOptions} from '@anglr/grid';
import {RecursivePartial} from '@jscrpt/common';

import {BasicPagingComponentOptions} from './basicPaging.options';
import {BasicPagingLayoutDesignerTypeLoader, BasicPagingLayoutMetadataLoader} from './basicPaging.metadata';
import {GridPluginComponent} from '../../interfaces';

/**
 * Component used for displaying basic paging
 */
@Component(
{
    selector: 'basic-paging',
    template: '',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorDesignerType(BasicPagingLayoutDesignerTypeLoader)
@LayoutEditorMetadata(BasicPagingLayoutMetadataLoader)
export class BasicPagingSAComponent extends LayoutComponentBase<BasicPagingComponentOptions> implements GridPluginComponent<GridBasicPaging, BasicPagingComponentOptions, BasicPagingOptions>
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
    public pluginDescription: PluginDescription<GridBasicPaging, RecursivePartial<BasicPagingOptions>> =
    {
        instance: null,
        instanceCallback: null,
        options:
        {
            initialItemsPerPage: 15,
            initialPage: 1,
            itemsPerPageValues: [15, 30, 60],
        },
        type: GridBasicPaging,
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