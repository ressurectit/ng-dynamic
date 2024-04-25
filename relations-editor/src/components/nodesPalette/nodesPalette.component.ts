import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Inject, Optional, OnDestroy, Input, SimpleChanges, Injector, inject} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {CommonModule} from '@angular/common';
import {CdkDropList, DragDropModule} from '@angular/cdk/drag-drop';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DynamicItemLoader, DynamicItemSource, PackageManager} from '@anglr/dynamic';
import {FirstUppercaseLocalizeSAPipe, Logger, LOGGER} from '@anglr/common';
import {DebounceCall, Dictionary, generateId, nameof, WithSync} from '@jscrpt/common';
import {Observable, Subscription} from 'rxjs';

import {NodesPaletteItem} from './nodesPalette.interface';
import {REFRESH_PALETTE_OBSERVABLES, RELATIONS_MODULE_TYPES_LOADER, RELATIONS_NODES_LOADER} from '../../misc/tokens';
import {RelationsModuleTypes, RelationsNodeDef} from '../../misc/types';
import {RelationsNodeManager} from '../../services';
import {ToRelationsDragDataSAPipe} from '../../pipes';
import {NodesPaletteItemSAComponent} from './item/nodesPaletteItem.component';
import {NodeGroupFilterSAPipe} from './pipes/nodeGroupFilter.pipe';
import {NodeItemFilterSAPipe} from './pipes/nodeItemFilter.pipe';

/**
 * Component displaying available nodes palette
 */
@Component(
{
    selector: 'nodes-palette',
    templateUrl: 'nodesPalette.component.html',
    standalone: true,
    imports:
    [
        CommonModule,
        DragDropModule,
        ReactiveFormsModule,
        // LayoutEditorDragPreviewSAComponent,
        // LayoutEditorDragPlaceholderSAComponent,
        ToRelationsDragDataSAPipe,
        NodesPaletteItemSAComponent,
        FirstUppercaseLocalizeSAPipe,
        NodeGroupFilterSAPipe,
        NodeItemFilterSAPipe,
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

    /**
     * Gets array of used packages
     */
    protected get usedPackages(): readonly string[]
    {
        return this.packages ?? this.packageManager.usedPackages();
    }

    /**
     * Injector used for obtaining dependencies
     */
    protected injector: Injector = inject(Injector);

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

    /**
     * Array of whitelisted packages
     */
    protected whiteListedPackages: string[] = [];

    /**
     * Search bar form control
     */
    protected searchBar: FormControl = new FormControl();

    //######################### public properties - inputs #########################

    /**
     * Instance of canvas drop list
     */
    @Input()
    public canvasDropList!: CdkDropList;

    /**
     * Array of packages that should be used, if specified, package manager is ignored
     */
    @Input()
    public packages: string[]|undefined|null;

    /**
     * Array of dynamic items sources which should be whitelisted, if this is used, package which is whitelisted will override black list and only components from whitelist will be available
     */
    @Input()
    public whiteList: DynamicItemSource[]|undefined|null;

    /**
     * Array of dynamic items sources which should be blacklisted, components used in this list will not be available, only if overriden by whitelist
     */
    @Input()
    public blackList: DynamicItemSource[]|undefined|null;

    //######################### constructor #########################
    constructor(@Inject(RELATIONS_MODULE_TYPES_LOADER) protected moduleTypesLoader: DynamicItemLoader<RelationsModuleTypes>,
                @Inject(RELATIONS_NODES_LOADER) protected nodesLoader: DynamicItemLoader<RelationsNodeDef>,
                protected changeDetector: ChangeDetectorRef,
                protected packageManager: PackageManager,
                protected metadataManager: RelationsNodeManager,
                @Inject(LOGGER) protected logger: Logger,
                @Inject(REFRESH_PALETTE_OBSERVABLES) @Optional() protected refreshObservables?: Observable<void>[],)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public async ngOnInit(): Promise<void>
    {
        this.initSubscriptions.add(toObservable(this.packageManager.usedPackages, {injector: this.injector})
            .subscribe(() => this.loadNodes()));

        if(this.refreshObservables && Array.isArray(this.refreshObservables))
        {
            for(const obs of this.refreshObservables)
            {
                this.initSubscriptions.add(obs.subscribe(() => this.loadNodes()));
            }
        }
    }

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * Called when input value changes
     */
    public async ngOnChanges(changes: SimpleChanges): Promise<void>
    {
        if(nameof<NodesPaletteSAComponent>('whiteList') in changes)
        {
            this.whiteListedPackages = [];

            if(Array.isArray(this.whiteList))
            {
                for(const source of this.whiteList)
                {
                    //package already whitelisted
                    if(this.whiteListedPackages.find(itm => itm == source.package))
                    {
                        continue;
                    }

                    this.whiteListedPackages.push(source.package);
                }
            }
        }

        if(nameof<NodesPaletteSAComponent>('whiteList') in changes ||
           nameof<NodesPaletteSAComponent>('blackList') in changes ||
           nameof<NodesPaletteSAComponent>('packages') in changes)
        {
            await this.loadNodes();
        }
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

        for (const packageName of this.usedPackages)
        {
            const types = (await this.moduleTypesLoader.loadItem({package: packageName, name: 'types'}))?.data ?? [];

            for(const type of types)
            {
                //package is whitelisted
                if(this.whiteListedPackages.find(itm => packageName == itm))
                {
                    //item is not whitelisted
                    if(!this.whiteList?.find(itm => itm.package == packageName && itm.name == type))
                    {
                        continue;
                    }
                }
                //item is blacklisted
                else if(this.blackList?.find(itm => itm.package == packageName && itm.name == type))
                {
                    continue;
                }

                const itemSource: DynamicItemSource = {package: packageName, name: type};
                const metadata = await this.nodesLoader.loadItem(itemSource);
    
                if(!metadata)
                {
                    this.logger.warn('NodesPaletteSAComponent: Failed to obtain layout editor metadata {{@source}}', {source: itemSource});
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

        this.changeDetector.detectChanges();
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