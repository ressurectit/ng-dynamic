import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Inject, Optional, OnDestroy, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkDropList, DragDropModule} from '@angular/cdk/drag-drop';
import {DynamicItemLoader, DynamicItemSource} from '@anglr/dynamic';
import {Logger, LOGGER} from '@anglr/common';
import {Dictionary, generateId} from '@jscrpt/common';
import {Observable, Subscription} from 'rxjs';

import {NodesPaletteItem} from './nodesPalette.interface';
import {REFRESH_PALETTE_OBSERVABLES, RELATIONS_MODULE_TYPES_LOADER, RELATIONS_NODES_LOADER} from '../../misc/tokens';
import {RelationsModuleTypes, RelationsNodeDef} from '../../misc/types';
import {RelationsNodeManager} from '../../services';
import {ToRelationsDragDataSAPipe} from '../../pipes';

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
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodesPaletteSAComponent implements OnInit, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subscriptions created during initialization
     */
    protected _initSubscriptions: Subscription = new Subscription();

    /**
     * Array of all available items in palette
     */
    protected _allItems: NodesPaletteItem[] = [];

    //######################### protected properties - template bindings #########################

    /**
     * Available items grouped by group name
     */
    protected _groupedItems: Dictionary<(NodesPaletteItem & {temp?: boolean})[]> = {};

    /**
     * Generated component id, that is used for new component
     */
    protected _newCompnentId: string = generateId(16);

    /**
     * Indication whether drag element is over palette
     */
    protected _isDragOverPalette: boolean = false;

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
                this._initSubscriptions.add(obs.subscribe(() => this.loadNodes()));
            }
        }

        await this.loadNodes();
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._initSubscriptions.unsubscribe();
    }

    /**
     * Loads available relations nodes into palette
     */
    protected async loadNodes(): Promise<void>
    {
        this._allItems = [];
        this._groupedItems = {};

        //TODO make it dynamic
        for (const packageName of ['basic-components', 'material-components', 'static-components', 'layout-components'])
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
                    this._allItems.push(
                    {
                        itemSource,
                        metadata
                    });
                }
            }
        }        

        this._groupedItems[''] = [];

        //group items
        for(const item of this._allItems)
        {
            const group = item.metadata.metaInfo?.group ?? '';
            this._groupedItems[group] ??= [];
            this._groupedItems[group].push(item);
        }

        this._changeDetector.detectChanges();
    }

    //######################### protected methods - template bindings #########################

    /**
     * Generates new component id
     */
    protected _generateNewId(): void
    {
        this._newCompnentId = generateId(16);
    }

    // /**
    //  * Removes temporary palette item when drag ends
    //  * @param key Items group key
    //  */
    // protected _onDragEnded(key: string): void
    // {
    //     if (!isPresent(key))
    //     {
    //         return;
    //     }

    //     this._groupedItems[key] = [...this._groupedItems[key].filter(datum => !datum.temp)];
    // }

    // /**
    //  * Generates temporary palette item when drag starts
    //  * @param event Drag start event
    //  * @param key Items group key
    //  * @param item Palette item
    //  */
    // protected _onDragStarted(event: CdkDragStart<LayoutComponentDragData>, key: string, item: NodesPaletteItem): void
    // {
    //     const currentIdx = event.source.dropContainer.getSortedItems().findIndex((datum: CdkDrag<LayoutComponentDragData>) => datum.data?.metadata?.id === event.source.data?.metadata?.id);

    //     if (isPresent(currentIdx))
    //     {
    //         this._groupedItems[key]?.splice(currentIdx + 1, 0, {
    //             ...item,
    //             temp: true
    //         });
    //     }
    // }
}