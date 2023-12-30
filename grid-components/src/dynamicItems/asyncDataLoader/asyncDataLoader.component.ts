import {Component, ChangeDetectionStrategy, Input, SimpleChanges} from '@angular/core';
import {LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {DynamicOutput, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {Grid, PluginDescription, AsyncDataLoaderOptions, AsyncDataLoaderSAComponent as GridAsyncDataLoader, SimpleOrdering, DataResponse} from '@anglr/grid';
import {Action1, BindThis, PagedData, PromiseOr, RecursivePartial, nameof, noop} from '@jscrpt/common';

import {AsyncDataLoaderComponentOptions, AsyncDataLoaderRelationsOptions} from './asyncDataLoader.options';
import {AsyncDataLoaderLayoutDesignerTypeLoader, AsyncDataLoaderLayoutMetadataLoader, AsyncDataLoaderRelationsMetadataLoader} from './asyncDataLoader.metadata';
import {GridPluginComponent} from '../../interfaces';

/**
 * Component used for displaying async data loader
 */
@Component(
{
    selector: 'async-data-loader',
    template: '',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorDesignerType(AsyncDataLoaderLayoutDesignerTypeLoader)
@RelationsEditorMetadata(AsyncDataLoaderRelationsMetadataLoader)
@LayoutEditorMetadata(AsyncDataLoaderLayoutMetadataLoader)
export class AsyncDataLoaderSAComponent extends LayoutComponentBase<AsyncDataLoaderComponentOptions> implements GridPluginComponent<GridAsyncDataLoader, AsyncDataLoaderComponentOptions, AsyncDataLoaderOptions>, RelationsComponent<AsyncDataLoaderRelationsOptions>
{
    //######################### protected fields #########################

    /**
     * Instance of grid
     */
    protected grid: Grid|undefined|null;

    /**
     * Resolve function for async data loader
     */
    protected resolve: Action1<DataResponse<unknown>> = noop;

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: AsyncDataLoaderRelationsOptions|undefined|null;

    //######################### public properties - inputs #########################

    /**
     * Result of async REST request for obtaining data
     */
    @Input()
    public result: PagedData<unknown>|undefined|null;

    //######################### public properties - dynamic outputs #########################

    /**
     * Requested page used for obtaining data
     */
    @DynamicOutput()
    public page: number|undefined|null;
    
    /**
     * Requested items per page used for obtaining data
     */
    @DynamicOutput()
    public itemsPerPage: number|undefined|null;
    
    /**
     * Requested ordering used for obtaining data
     */
    @DynamicOutput()
    public ordering: SimpleOrdering|undefined|null;

    //######################### public properties - implementation of GridDataLoaderPlugin #########################
    
    /**
     * @inheritdoc
     */
    public pluginDescription: PluginDescription<GridAsyncDataLoader, RecursivePartial<AsyncDataLoaderOptions>> =
    {
        instance: null,
        instanceCallback: null,
        options:
        {
            dataCallback: this.getData,
        },
        type: GridAsyncDataLoader,
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
    protected override onChanges(changes: SimpleChanges): PromiseOr<void>
    {
        if(nameof<AsyncDataLoaderSAComponent>('result') in changes)
        {
            this.resolve(
            {
                data: this.result?.content ?? [],
                totalCount: this.result?.totalElements ?? 0,
            });
        }
    }

    //######################### protected methods #########################

    /**
     * Callback used for obtaining data
     * @param page - Index of requested page
     * @param itemsPerPage - Number of items per page
     * @param ordering - Order by column name
     */
    @BindThis
    protected getData(page: number, itemsPerPage: number, ordering: SimpleOrdering): Promise<DataResponse<unknown>>
    {
        this.page = page - 1;
        this.itemsPerPage = itemsPerPage;
        this.ordering = ordering;

        return new Promise(resolve => this.resolve = resolve);
    }
}