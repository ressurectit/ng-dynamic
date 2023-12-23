import {Component, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {LayoutComponent, LayoutComponentBase, LayoutComponentMetadata, LayoutComponentRendererSADirective, LayoutRendererItem} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {DataLoader, Grid, GridOptions, MatrixGridModule, SyncDataLoaderOptions, SyncDataLoaderSAComponent} from '@anglr/grid';
import {patchOptions, reinitializeOptions} from '@anglr/grid/extensions';
import {BindThis, PromiseOr, RecursivePartial} from '@jscrpt/common';

import {DataTableComponentOptions} from './dataTable.options';
import {DataTableLayoutDesignerTypeLoader, DataTableLayoutMetadataLoader} from './dataTable.metadata';
import {GridDataLoaderPlugin} from '../../interfaces';
import {SyncDataLoaderComponentOptions} from '../syncDataLoader';
import {ScopedMatrixContentRendererSAComponent} from '../../misc/classes/scopedMatrixContentRenderer.component';

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
    //######################### protected fields #########################

    /**
     * Initialization status for grid
     */
    protected initializationStatus =
    {
        dataLoader: false,
        paging: true,
    };

    //######################### protected properties #########################

    /**
     * Grid instance with safe access
     */
    protected get gridSafe(): Grid
    {
        if(!this.grid)
        {
            throw new Error('DataTableSAComponent: missing grid instance!');
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
                type: ScopedMatrixContentRendererSAComponent,
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
     * Callback called when component was fully rendered
     * @param item - Item that contains information about rendered component
     */
    @BindThis
    protected async renderedComponentCallback(item: unknown): Promise<void>
    {
        const itm: LayoutRendererItem = item as LayoutRendererItem;
        const dataLoaderComponent = itm.component?.instance as GridDataLoaderPlugin<DataLoader, SyncDataLoaderComponentOptions, SyncDataLoaderOptions>;
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
                id: column.id,
                header: null,
                content: null,
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
                        type: SyncDataLoaderSAComponent,
                    }
                }
            }));

            this.initializationStatus.dataLoader = true; 
        }

        if(this.initializationStatus.dataLoader &&
           this.initializationStatus.paging)
        {
            await this.gridSafe.execute(reinitializeOptions());
        }
    }
}