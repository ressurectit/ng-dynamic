import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Inject, Optional, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkDrag, CdkDragStart, DragDropModule} from '@angular/cdk/drag-drop';
import {DynamicItemLoader, DynamicItemSource} from '@anglr/dynamic';
import {Logger, LOGGER} from '@anglr/common';
import {Dictionary, generateId, isPresent} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {LayoutEditorMetadataExtractor, LayoutEditorMetadataManager} from '../../services';
import {ComponentsPaletteItem, LayoutModuleTypes} from './componentsPalette.interface';
import {ToLayoutDragDataSAPipe} from '../../pipes';
import {LayoutEditorDragPlaceholderSAComponent} from '../layoutEditorDragPlaceholder/layoutEditorDragPlaceholder.component';
import {LayoutEditorDragPreviewSAComponent} from '../layoutEditorDragPreview/layoutEditorDragPreview.component';
import {LayoutComponentDragData} from '../../interfaces';
import {LAYOUT_MODULE_TYPES_LOADER} from '../../misc/tokens';

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
        DragDropModule,
        LayoutEditorDragPreviewSAComponent,
        LayoutEditorDragPlaceholderSAComponent,
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
    protected _initSubscriptions: Subscription = new Subscription();

    /**
     * Array of all available items in palette
     */
    protected _allItems: ComponentsPaletteItem[] = [];

    //######################### protected properties - template bindings #########################

    /**
     * Available items grouped by group name
     */
    protected _groupedItems: Dictionary<(ComponentsPaletteItem & {temp?: boolean})[]> = {};

    /**
     * Array of available cdk drop lists
     */
    protected _designerDropLists: string[] = [];

    /**
     * Generated component id, that is used for new component
     */
    protected _newCompnentId: string = generateId(16);

    /**
     * Indication whether drag element is over palette
     */
    protected _isDragOverPalette: boolean = false;

    //######################### constructor #########################
    constructor(@Inject(LAYOUT_MODULE_TYPES_LOADER) protected _moduleTypesLoader: DynamicItemLoader<LayoutModuleTypes>,
                protected _changeDetector: ChangeDetectorRef,
                protected _metadataExtractor: LayoutEditorMetadataExtractor,
                protected _metadataManager: LayoutEditorMetadataManager,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public async ngOnInit(): Promise<void>
    {
        this._initSubscriptions.add(this._metadataManager.layoutChange.subscribe(() => this._getDesignerDropLists()));

        this._getDesignerDropLists();

        const types = (await this._moduleTypesLoader.loadItem({package: 'basic-components', name: 'types'}))?.data ?? [];

        for(const type of types)
        {
            const itemSource: DynamicItemSource = {package: 'basic-components', name: type};
            const metadata = await this._metadataExtractor.extractMetadata(itemSource);

            if(!metadata)
            {
                this._logger?.warn('ComponentsPaletteSAComponent: Failed to obtain layout editor metadata {@source}', itemSource);
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

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._initSubscriptions.unsubscribe();
    }

    //######################### protected methods - template bindings #########################

    /**
     * Generates new component id
     */
    protected _generateNewId(): void
    {
        this._newCompnentId = generateId(16);
    }

    /**
     * Removes temporary palette item when drag ends
     * @param key Items group key
     */
    protected _onDragEnded(key: string): void
    {
        if (!isPresent(key))
        {
            return;
        }

        this._groupedItems[key] = [...this._groupedItems[key].filter(datum => !datum.temp)];
    }

    /**
     * Generates temporary palette item when drag starts
     * @param event Drag start event
     * @param key Items group key
     * @param item Palette item
     */
    protected _onDragStarted(event: CdkDragStart<LayoutComponentDragData>, key: string, item: ComponentsPaletteItem): void
    {
        const currentIdx = event.source.dropContainer.getSortedItems().findIndex((datum: CdkDrag<LayoutComponentDragData>) => datum.data?.metadata?.id === event.source.data?.metadata?.id);

        if (isPresent(currentIdx))
        {
            this._groupedItems[key]?.splice(currentIdx + 1, 0, {
                ...item,
                temp: true
            });
        }
    }

    //######################### protected methods #########################

    /**
     * Gets and sets designer drop lists
     */
    protected _getDesignerDropLists(): void
    {
        this._designerDropLists = this._metadataManager.flatTree.map(itm => itm.component.id).reverse();
    }
}