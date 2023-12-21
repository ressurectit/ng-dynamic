import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Inject, Optional, OnDestroy, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicItemLoader, DynamicItemSource, PackageManager} from '@anglr/dynamic';
import {FirstUppercaseLocalizeSAPipe, Logger, LOGGER} from '@anglr/common';
import {DebounceCall, Dictionary, nameof, WithSync} from '@jscrpt/common';
import {Observable, Subscription} from 'rxjs';

import {LayoutEditorMetadataExtractor} from '../../services';
import {ComponentsPaletteItem, LayoutModuleTypes} from './componentsPalette.interface';
import {ToLayoutDragDataSAPipe} from '../../pipes';
import {LAYOUT_MODULE_TYPES_LOADER, REFRESH_PALETTE_OBSERVABLES} from '../../misc/tokens';
import {LayoutDndCoreModule} from '../../modules';

/**
 * Component displaying available components palette
 */
@Component(
{
    selector: 'components-palette',
    templateUrl: 'componentsPalette.component.html',
    standalone: true,
    imports:
    [
        CommonModule,
        LayoutDndCoreModule,
        ToLayoutDragDataSAPipe,
        FirstUppercaseLocalizeSAPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsPaletteSAComponent implements OnInit, OnChanges, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Array of all available items in palette
     */
    protected allItems: ComponentsPaletteItem[] = [];

    /**
     * Gets array of used packages
     */
    protected get usedPackages(): string[]
    {
        return this.packages ?? this.packageManager.usedPackages;
    }

    /**
     * Array of whitelisted packages
     */
    protected whiteListedPackages: string[] = [];

    //######################### protected properties - template bindings #########################

    //TODO: remove temp???

    /**
     * Available items grouped by group name
     */
    protected groupedItems: Dictionary<(ComponentsPaletteItem & {temp?: boolean})[]> = {};

    /**
     * Used for refreshing pipe value
     */
    protected refreshPipe: boolean = false;

    //######################### public properties - inputs #########################

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
    constructor(@Inject(LAYOUT_MODULE_TYPES_LOADER) protected moduleTypesLoader: DynamicItemLoader<LayoutModuleTypes>,
                protected changeDetector: ChangeDetectorRef,
                protected packageManager: PackageManager,
                protected metadataExtractor: LayoutEditorMetadataExtractor,
                @Inject(REFRESH_PALETTE_OBSERVABLES) @Optional() protected _refreshObservables?: Observable<void>[],
                @Inject(LOGGER) @Optional() protected logger?: Logger,)
    {
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public async ngOnInit(): Promise<void>
    {
        this.initSubscriptions.add(this.packageManager.usedPackagesChange.subscribe(() => this.initItems()));

        if(this._refreshObservables && Array.isArray(this._refreshObservables))
        {
            for(const obs of this._refreshObservables)
            {
                this.initSubscriptions.add(obs.subscribe(() => this.initItems()));
            }
        }

        await this.initItems();
    }

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * Called when input value changes
     */
    public async ngOnChanges(changes: SimpleChanges): Promise<void>
    {
        if(nameof<ComponentsPaletteSAComponent>('whiteList') in changes)
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

        if(nameof<ComponentsPaletteSAComponent>('whiteList') in changes ||
           nameof<ComponentsPaletteSAComponent>('blackList') in changes ||
           nameof<ComponentsPaletteSAComponent>('packages') in changes)
        {
            await this.initItems();
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

    //######################### protected methods #########################

    /**
     * Initialize items in palette
     */
    @DebounceCall(10)
    @WithSync()
    protected async initItems(): Promise<void>
    {
        this.groupedItems = {};
        this.allItems = [];

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
                const metadata = await this.metadataExtractor.extractMetadata(itemSource);

                if(!metadata)
                {
                    this.logger?.warn('ComponentsPaletteSAComponent: Failed to obtain layout editor metadata {{@source}}', {source: itemSource});
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
}