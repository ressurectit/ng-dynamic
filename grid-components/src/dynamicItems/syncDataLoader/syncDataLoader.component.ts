import {Component, ChangeDetectionStrategy, Input, SimpleChanges} from '@angular/core';
import {LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {Grid, PluginDescription, SyncDataLoaderOptions, SyncDataLoaderComponent as GridSyncDataLoader} from '@anglr/grid';
import {setSyncData} from '@anglr/grid/extensions';
import {PromiseOr, RecursivePartial, nameof} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';
import {first} from 'rxjs';

import {SyncDataLoaderComponentOptions, SyncDataLoaderRelationsOptions} from './syncDataLoader.options';
import {SyncDataLoaderLayoutDesignerTypeLoader, SyncDataLoaderLayoutMetadataLoader, SyncDataLoaderRelationsMetadataLoader} from './syncDataLoader.metadata';
import {GridPluginComponent} from '../../interfaces';

/**
 * Component used for displaying sync data loader
 */
@Component(
{
    selector: 'sync-data-loader',
    template: '',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorDesignerType(SyncDataLoaderLayoutDesignerTypeLoader)
@RelationsEditorMetadata(SyncDataLoaderRelationsMetadataLoader)
@LayoutEditorMetadata(SyncDataLoaderLayoutMetadataLoader)
export class SyncDataLoaderComponent extends LayoutComponentBase<SyncDataLoaderComponentOptions> implements GridPluginComponent<GridSyncDataLoader, SyncDataLoaderComponentOptions, SyncDataLoaderOptions>, RelationsComponent<SyncDataLoaderRelationsOptions>
{
    //######################### protected fields #########################

    /**
     * Instance of grid
     */
    protected grid: Grid|undefined|null;

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: SyncDataLoaderRelationsOptions|undefined|null;

    //######################### public properties - inputs #########################

    /**
     * Data that are displayed in grid using sync data loader
     */
    @Input()
    public data: unknown[] = [];

    //######################### public properties - implementation of GridDataLoaderPlugin #########################
    
    /**
     * @inheritdoc
     */
    public pluginDescription: PluginDescription<GridSyncDataLoader, RecursivePartial<SyncDataLoaderOptions>> =
    {
        instance: null,
        instanceCallback: null,
        options:
        {
            data: [],
        },
        type: GridSyncDataLoader,
    };

    //######################### public methods - implementation of GridDataLoaderPlugin #########################
    
    /**
     * @inheritdoc
     */
    public setGridInstance(grid: Grid): void
    {
        this.grid = grid;

        this.setData();
    }

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onChanges(changes: SimpleChanges): PromiseOr<void>
    {
        if(nameof<SyncDataLoaderComponent>('data') in changes)
        {
            this.setData();
        }
    }

    //######################### protected methods #########################

    /**
     * Sets data to data loader
     */
    protected async setData(): Promise<void>
    {
        if(!this.grid)
        {
            return;
        }

        await lastValueFrom(this.grid.initialized.pipe(first(itm => itm)));

        this.grid.execute(setSyncData(this.data));
    }
}