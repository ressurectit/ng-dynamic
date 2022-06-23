import {Inject, Injectable, Optional, Type} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {Dictionary, isType, resolvePromiseOr} from '@jscrpt/common';

import {DYNAMIC_MODULE_DATA_EXTRACTORS, DYNAMIC_ITEM_LOADER_PROVIDERS} from '../../misc/tokens';
import {DynamicItemLoaderProvider} from './dynamicItemLoader.interface';
import {DynamicItem, DynamicModule, DynamicItemSource, DynamicItemType, DynamicModuleDataExtractor} from '../../interfaces';

/**
 * Service used for loading dynamic items
 */
@Injectable({providedIn: 'root'})
export class DynamicItemLoader
{
    //######################### protected cache #########################

    /**
     * Cached dynamic items
     */
    protected _cachedDynamicItems: Dictionary<DynamicItemType<DynamicItem>> = {};

    //######################### constructors #########################
    constructor(@Inject(DYNAMIC_ITEM_LOADER_PROVIDERS) protected _providers: DynamicItemLoaderProvider[],
                @Inject(DYNAMIC_MODULE_DATA_EXTRACTORS) protected _extractors: DynamicModuleDataExtractor<Type<DynamicItem>>[],
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
        let dynamicModule: DynamicModule|null = null;
        const cacheId = `${source.package}-${source.name}`;

        //try to get from cache
        if(this._cachedDynamicItems[cacheId])
        {
            this._logger?.verbose('DynamicItemLoader: Loading from cache {@source}', {name: source.name, package: source.package});

            return this._cachedDynamicItems[cacheId] as DynamicItemType<TType>;
        }

        //loops all providers, return result from first that returns non null value
        for(const provider of this._providers)
        {
            const asyncDynamicModule = provider.tryToGet(source);

            if(asyncDynamicModule)
            {
                dynamicModule = await resolvePromiseOr(asyncDynamicModule);
            }
            else
            {
                dynamicModule = null;
            }

            if(dynamicModule)
            {
                break;
            }
        }

        //no module found
        if(!dynamicModule)
        {
            this._logger?.debug('DynamicItemLoader: Failed to get dynamic module {@source}', {name: source.name, package: source.package});

            return null;
        }

        //loops all extractors, return result from first that returns non null value
        for(const extractor of this._extractors)
        {
            const dynamicItemType = extractor.tryToExtract(dynamicModule);

            if(dynamicItemType && isType(dynamicItemType))
            {
                const result = 
                {
                    type: dynamicItemType as Type<TType>
                };

                return this._cachedDynamicItems[cacheId] = result;
            }
        }

        this._logger?.debug('DynamicItemLoader: Failed to extract dynamic type {@source}', {name: source.name, package: source.package});

        return null;
    }
}