import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Inject, Optional, OnDestroy, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkDropList, DragDropModule} from '@angular/cdk/drag-drop';
import {DynamicItemLoader, DynamicItemSource, PackageManager} from '@anglr/dynamic';
import {Logger, LOGGER} from '@anglr/common';
import {DebounceCall, Dictionary, generateId, WithSync} from '@jscrpt/common';
import {Observable, Subscription} from 'rxjs';

import {NodesPaletteItem} from './nodesPalette.interface';
import {REFRESH_PALETTE_OBSERVABLES, RELATIONS_MODULE_TYPES_LOADER, RELATIONS_NODES_LOADER} from '../../misc/tokens';
import {RelationsModuleTypes, RelationsNodeDef} from '../../misc/types';
import {RelationsNodeManager} from '../../services';
import {ToRelationsDragDataSAPipe} from '../../pipes';
import {NodesPaletteItemSAComponent} from './item/nodesPaletteItem.component';

/**
 * Component displaying available nodes palette
 */
@Component(
{
    selector: 'nodes-palette',
    templateUrl: 'nodesPalette.component.html',
    styleUrls: ['nodesPalette.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
        DragDropModule,
        // LayoutEditorDragPreviewSAComponent,
        // LayoutEditorDragPlaceholderSAComponent,
        ToRelationsDragDataSAPipe,
        NodesPaletteItemSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodesPaletteSAComponent implements OnInit, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Array of all available items in palette
     */
    protected allItems: NodesPaletteItem[] = [];

    //######################### protected properties - template bindings #########################

    /**
     * Available items grouped by group name
     */
    protected groupedItems: Dictionary<(NodesPaletteItem & {temp?: boolean})[]> = {};

    /**
     * Generated component id, that is used for new component
     */
    protected newCompnentId: string = generateId(16);

    /**
     * Indication whether drag element is over palette
     */
    protected isDragOverPalette: boolean = false;

    //######################### public properties - inputs #########################

    /**
     * Instance of canvas drop list
     */
    @Input()
    public canvasDropList!: CdkDropList;

    //######################### constructor #########################
    constructor(@Inject(RELATIONS_MODULE_TYPES_LOADER) protected _moduleTypesLoader: DynamicItemLoader<RelationsModuleTypes>,
                @Inject(RELATIONS_NODES_LOADER) protected _nodesLoader: DynamicItemLoader<RelationsNodeDef>,
                protected _changeDetector: ChangeDetectorRef,
                protected packageManager: PackageManager,
                protected _metadataManager: RelationsNodeManager,
                @Inject(REFRESH_PALETTE_OBSERVABLES) @Optional() protected _refreshObservables?: Observable<void>[],
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public async ngOnInit(): Promise<void>
    {
        if(this._refreshObservables && Array.isArray(this._refreshObservables))
        {
            for(const obs of this._refreshObservables)
            {
                this.initSubscriptions.add(obs.subscribe(() => this.loadNodes()));
            }
        }

        this.initSubscriptions.add(this.packageManager.usedPackagesChange.subscribe(() => this.loadNodes()));

        await this.loadNodes();
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();
    }

    /**
     * Loads available relations nodes into palette
     */
    @DebounceCall(10)
    @WithSync()
    protected async loadNodes(): Promise<void>
    {
        this.allItems = [];
        this.groupedItems = {};

        for (const packageName of this.packageManager.usedPackages)
        {
            const types = (await this._moduleTypesLoader.loadItem({package: packageName, name: 'types'}))?.data ?? [];

            for(const type of types)
            {
                const itemSource: DynamicItemSource = {package: packageName, name: type};
                const metadata = await this._nodesLoader.loadItem(itemSource);
    
                if(!metadata)
                {
                    this._logger?.warn('NodesPaletteSAComponent: Failed to obtain layout editor metadata {@source}', itemSource);
                }
                else
                {
                    this.allItems.push(
                    {
                        itemSource,
                        metadata
                    });
                }
            }
        }        

        this.groupedItems[''] = [];

        //group items
        for(const item of this.allItems)
        {
            const group = item.metadata.metaInfo?.group ?? '';
            this.groupedItems[group] ??= [];
            this.groupedItems[group].push(item);
        }

        this._changeDetector.detectChanges();
    }

    //######################### protected methods - template bindings #########################

    /**
     * Generates new component id
     */
    protected generateNewId(): void
    {
        this.newCompnentId = generateId(16);
    }
}