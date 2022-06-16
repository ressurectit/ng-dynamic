import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {resolvePromiseOr} from '@jscrpt/common';

import {DYNAMIC_ITEM_LOADER_EXTRACTORS, DYNAMIC_ITEM_LOADER_PROVIDERS} from '../../misc/tokens';
import {DynamicItemLoaderExtractor, DynamicItemLoaderProvider} from './dynamicItemLoader.interface';
import {DynamicItem, DynamicItemModule, DynamicItemSource, DynamicItemType} from '../../metadata';

/**
 * Service used for loading dynamic items
 */
@Injectable({providedIn: 'root'})
export class DynamicItemLoader
{
    //######################### constructors #########################
    constructor(@Inject(DYNAMIC_ITEM_LOADER_PROVIDERS) protected _providers: DynamicItemLoaderProvider[],
                @Inject(DYNAMIC_ITEM_LOADER_EXTRACTORS) protected _extractors: DynamicItemLoaderExtractor[],
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
        //providers is not an array
        if(!Array.isArray(this._providers))
        {
            this._logger?.error('DynamicItemLoader: missing providers!');

            this._providers = [];
        }

        //extractors is not an array
        if(!Array.isArray(this._extractors))
        {
            this._logger?.error('DynamicItemLoader: missing extractors!');

            this._extractors = [];
        }
    }

    //######################### public methods #########################

    /**
     * Loads dynamic item type, or null if not found
     * @param source - Definition of source for dynamic item
     */
    public async loadItem<TType extends DynamicItem = any>(source: DynamicItemSource): Promise<DynamicItemType<TType>|null>
    {
        let dynamicItemModule: DynamicItemModule|null = null;

        //loops all providers, return result from first that returns non null value
        for(const provider of this._providers)
        {
            const asyncDynamicItemModule = provider.tryToGet(source);

            if(asyncDynamicItemModule)
            {
                dynamicItemModule = await resolvePromiseOr(asyncDynamicItemModule);
            }
            else
            {
                dynamicItemModule = null;
            }

            if(dynamicItemModule)
            {
                break;
            }
        }

        //no module found
        if(!dynamicItemModule)
        {
            this._logger?.debug('DynamicItemLoader: Failed to get dynamic item module {@source}', {name: source.name, package: source.package});

            return null;
        }

        //loops all extractors, return result from first that returns non null value
        for(const extractor of this._extractors)
        {
            const dynamicItemType = extractor.tryToExtract(dynamicItemModule);

            if(dynamicItemType)
            {
                return dynamicItemType;
            }
        }

        this._logger?.debug('DynamicItemLoader: Failed to extract dynamic item type {@source}', {name: source.name, package: source.package});

        return null;
    }
}