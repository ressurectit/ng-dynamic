import {Component, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {LayoutComponent, LayoutComponentBase, LayoutComponentMetadata, LayoutComponentRendererDirective, LayoutRendererItem} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {DataLoader, DataLoaderOptions, Grid, GridOptions, MatrixGridModule, MetadataSelector, MetadataSelectorOptions, NoMetadataSelectorComponent, NoPagingOptions, NoPagingComponent, Paging, PagingOptions, SyncDataLoaderOptions, SyncDataLoaderComponent} from '@anglr/grid';
import {patchOptions, reinitializeOptions} from '@anglr/grid/extensions';
import {BindThis, PromiseOr, RecursivePartial} from '@jscrpt/common';

import {DataTableComponentOptions} from './dataTable.options';
import {DataTableLayoutDesignerTypeLoader, DataTableLayoutMetadataLoader} from './dataTable.metadata';
import {GridPluginComponent} from '../../interfaces';
import {ScopedMatrixContentRendererComponent} from '../../misc/classes/scopedMatrixContentRenderer.component';
import {DataLoaderComponentOptions} from '../dataLoader';
import {PagingComponentOptions} from '../paging';
import {MetadataSelectorComponentOptions} from '../metadataSelector';

/**
 * Definition of column
 */
interface ColDef
{
    /**
     * Id of column
     */
    id: string;

    /**
     * Width of column
     */
    width: string;

    /**
     * Title of column displayed during column selection
     */
    title: string;

    /**
     * Indication whether is column orderable
     */
    orderable: boolean;

    /**
     * Header template
     */
    header: LayoutComponentMetadata|undefined|null;

    /**
     * Content template
     */
    content: LayoutComponentMetadata|undefined|null;
}

/**
 * Component used for displaying data table
 */
@Component(
{
    selector: 'data-table',
    templateUrl: 'dataTable.component.html',
    styles: [HostDisplayBlockStyle],
    imports:
    [
        MatrixGridModule,
        LayoutComponentRendererDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<DataTableComponentOptions>(options =>
{
    if(!options)
    {
        return [];
    }

    return [options.columns, options.paging, options.dataLoader, options.metadataSelector];
})
@LayoutEditorDesignerType(DataTableLayoutDesignerTypeLoader)
@LayoutEditorMetadata(DataTableLayoutMetadataLoader)
export class DataTableComponent extends LayoutComponentBase<DataTableComponentOptions> implements LayoutComponent<DataTableComponentOptions>
{
    //######################### protected fields #########################

    /**
     * Initialization status for grid
     */
    protected initializationStatus =
    {
        dataLoader: false,
        paging: false,
        metadataSelector: false,
    };

    //######################### protected properties #########################

    /**
     * Grid instance with safe access
     */
    protected get gridSafe(): Grid
    {
        if(!this.grid)
        {
            throw new Error('DataTableComponent: missing grid instance!');
        }

        return this.grid;
    }

    //######################### protected properties - template bindings #########################

    /**
     * Definition of columns
     */
    protected colsDef: ColDef[] = [];

    /**
     * Instance of grid options for grid
     */
    protected gridOptions: RecursivePartial<GridOptions> =
    {
        autoInitialize: false,
        plugins:
        {
            contentRenderer:
            {
                type: ScopedMatrixContentRendererComponent,
            }
        }
    };

    //######################### protected properties - children #########################

    /**
     * Instance of grid
     */
    @ViewChild('grid', {static: true})
    protected grid: Grid|undefined|null;

    //######################### protected methods - template bindings #########################

    /**
     * Callback called when data loader was rendered
     * @param item - Item that contains information about rendered data loader
     */
    @BindThis
    protected async dataLoaderCallback(item: unknown): Promise<void>
    {
        const itm: LayoutRendererItem = item as LayoutRendererItem;
        const dataLoaderComponent = itm.component?.instance as GridPluginComponent<DataLoader, DataLoaderComponentOptions, DataLoaderOptions>;
        dataLoaderComponent.setGridInstance(this.gridSafe);

        this.gridSafe.execute(patchOptions(
        {
            plugins:
            {
                dataLoader: dataLoaderComponent.pluginDescription,
            }
        }));

        this.initializationStatus.dataLoader = true;

        this.initializeGrid();
    }

    /**
     * Callback called when paging was rendered
     * @param item - Item that contains information about rendered paging
     */
    @BindThis
    protected async pagingCallback(item: unknown): Promise<void>
    {
        const itm: LayoutRendererItem = item as LayoutRendererItem;
        const pagingComponent = itm.component?.instance as GridPluginComponent<Paging, PagingComponentOptions, PagingOptions>;
        pagingComponent.setGridInstance(this.gridSafe);

        this.gridSafe.execute(patchOptions(
        {
            plugins:
            {
                paging: pagingComponent.pluginDescription,
            }
        }));

        this.initializationStatus.paging = true;

        this.initializeGrid();
    }

    /**
     * Callback called when metadata selector was rendered
     * @param item - Item that contains information about rendered metadata selector
     */
    @BindThis
    protected async metadataSelectorCallback(item: unknown): Promise<void>
    {
        const itm: LayoutRendererItem = item as LayoutRendererItem;
        const metadataSelectorComponent = itm.component?.instance as GridPluginComponent<MetadataSelector, MetadataSelectorComponentOptions, MetadataSelectorOptions>;
        metadataSelectorComponent.setGridInstance(this.gridSafe);

        this.gridSafe.execute(patchOptions(
        {
            plugins:
            {
                metadataSelector: metadataSelectorComponent.pluginDescription,
            }
        }));

        this.initializationStatus.metadataSelector = true;

        this.initializeGrid();
    }

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onInit(): PromiseOr<void>
    {
        for(const column of this.optionsSafe.columns.options?.columns ?? [])
        {
            const colDef: ColDef =
            {
                id: column.options?.orderingName || column.displayName || column.id,
                header: null,
                content: null,
                width: column.options?.width ?? '1fr',
                orderable: column.options?.orderable ?? false,
                title: column.displayName || column.id,
            };

            colDef.header = column.options?.header.options?.content;
            colDef.content = column.options?.content.options?.content;

            this.colsDef.push(colDef);
        }

        this.changeDetector.detectChanges();

        this.initializeGrid();
    }

    //######################### protected methods #########################

    /**
     * Initialize grid
     */
    protected async initializeGrid(): Promise<void>
    {
        //no data loader plugin provided
        if(!this.initializationStatus.dataLoader && !this.optionsSafe.dataLoader.options?.plugin)
        {
            this.gridSafe.execute(patchOptions(
            {
                plugins:
                {
                    dataLoader:
                    {
                        options: <RecursivePartial<SyncDataLoaderOptions>>
                        {
                            data: [],
                        },
                        type: SyncDataLoaderComponent,
                    }
                }
            }));

            this.initializationStatus.dataLoader = true;
        }

        //no paging plugin provided
        if(!this.initializationStatus.paging && !this.optionsSafe.paging.options?.plugin)
        {
            this.gridSafe.execute(patchOptions(
            {
                plugins:
                {
                    paging:
                    {
                        options: <RecursivePartial<NoPagingOptions>>
                        {
                            initialItemsPerPage: NaN,
                        },
                        type: NoPagingComponent,
                    }
                }
            }));

            this.initializationStatus.paging = true;
        }

        //no metadata selector plugin provided
        if(!this.initializationStatus.metadataSelector && !this.optionsSafe.metadataSelector.options?.plugin)
        {
            this.gridSafe.execute(patchOptions(
            {
                plugins:
                {
                    metadataSelector:
                    {
                        type: NoMetadataSelectorComponent,
                    }
                }
            }));

            this.initializationStatus.metadataSelector = true;
        }

        if(this.initializationStatus.dataLoader &&
           this.initializationStatus.paging &&
           this.initializationStatus.metadataSelector)
        {
            await this.gridSafe.execute(reinitializeOptions());
        }
    }
}