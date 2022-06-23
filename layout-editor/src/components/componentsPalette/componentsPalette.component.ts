import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Inject, Optional} from '@angular/core';
import {DynamicItemSource, DynamicModuleTypesLoader} from '@anglr/dynamic';
import {Logger, LOGGER} from '@anglr/common';

import {LayoutEditorMetadataExtractor, LayoutEditorMetadataManager} from '../../services';
import {ComponentsPaletteItem} from './componentsPalette.interface';

/**
 * Component displaying available components palette
 */
@Component(
{
    selector: 'components-palette',
    templateUrl: 'componentsPalette.component.html',
    styleUrls: ['componentsPalette.component.css'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsPaletteSAComponent implements OnInit
{
    //######################### protected fields #########################

    /**
     * Array of all available items in palette
     */
    protected _allItems: ComponentsPaletteItem[] = [];

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

        console.log(this._allItems);
    }
}