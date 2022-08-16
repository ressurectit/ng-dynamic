import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Inject, Optional, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicItemLoader, DynamicItemSource, PackageManager} from '@anglr/dynamic';
import {Logger, LOGGER} from '@anglr/common';
import {Dictionary} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {LayoutEditorMetadataExtractor} from '../../services';
import {ComponentsPaletteItem, LayoutModuleTypes} from './componentsPalette.interface';
import {ToLayoutDragDataSAPipe} from '../../pipes';
import {LAYOUT_MODULE_TYPES_LOADER} from '../../misc/tokens';
import {LayoutDndCoreModule} from '../../modules';

/**
 * Component displaying available components palette
 */
@Component(
{
    selector: 'components-palette',
    templateUrl: 'componentsPalette.component.html',
    styleUrls: ['componentsPalette.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
        LayoutDndCoreModule,
        ToLayoutDragDataSAPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsPaletteSAComponent implements OnInit, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Array of all available items in palette
     */
    protected allItems: ComponentsPaletteItem[] = [];

    //######################### protected properties - template bindings #########################

    /**
     * Available items grouped by group name
     */
    protected groupedItems: Dictionary<(ComponentsPaletteItem & {temp?: boolean})[]> = {};

    /**
     * Used for refreshing pipe value
     */
    protected refreshPipe: boolean = false;

    //######################### constructor #########################
    constructor(@Inject(LAYOUT_MODULE_TYPES_LOADER) protected moduleTypesLoader: DynamicItemLoader<LayoutModuleTypes>,
                protected changeDetector: ChangeDetectorRef,
                protected packageManager: PackageManager,
                protected metadataExtractor: LayoutEditorMetadataExtractor,
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

        await this.initItems();
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
    protected async initItems(): Promise<void>
    {
        this.groupedItems = {};
        this.allItems = [];

        for (const packageName of this.packageManager.usedPackages)
        {
            const types = (await this.moduleTypesLoader.loadItem({package: packageName, name: 'types'}))?.data ?? [];

            for(const type of types)
            {
                const itemSource: DynamicItemSource = {package: packageName, name: type};
                const metadata = await this.metadataExtractor.extractMetadata(itemSource);

                if(!metadata)
                {
                    this.logger?.warn('ComponentsPaletteSAComponent: Failed to obtain layout editor metadata {@source}', itemSource);
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