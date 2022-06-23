import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Inject, Optional, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkDropList, DragDropModule} from '@angular/cdk/drag-drop';
import {DynamicItemSource, DynamicModuleTypesLoader} from '@anglr/dynamic';
import {Logger, LOGGER} from '@anglr/common';
import {Dictionary, generateId} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {LayoutEditorMetadataExtractor, LayoutEditorMetadataManager} from '../../services';
import {ComponentsPaletteItem} from './componentsPalette.interface';
import {ToLayoutDragDataSAPipe} from '../../pipes';
import {LayoutEditorDragPlaceholderSAComponent} from '../layoutEditorDragPlaceholder/layoutEditorDragPlaceholder.component';
import {LayoutEditorDragPreviewSAComponent} from '../layoutEditorDragPreview/layoutEditorDragPreview.component';

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

    //######################### protected fields - template bindings #########################

    /**
     * Available items grouped by group name
     */
    protected _groupedItems: Dictionary<ComponentsPaletteItem[]> = {};

    /**
     * Array of available cdk drop lists
     */
    protected _designerDropLists: CdkDropList<any>[] = [];

    /**
     * Generated component id, that is used for new component
     */
    protected _newCompnentId: string = generateId(16);

    //######################### constructor #########################
    constructor(protected _moduleTypesLoader: DynamicModuleTypesLoader,
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

        const types = (await this._moduleTypesLoader.loadTypes('basic-components')) ?? [];

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

    //######################### protected methods #########################

    /**
     * Gets and sets designer drop lists
     */
    protected _getDesignerDropLists(): void
    {
        this._designerDropLists = this._metadataManager.flatTree.map(itm => itm.component.designerDropList).reverse();
    }
}