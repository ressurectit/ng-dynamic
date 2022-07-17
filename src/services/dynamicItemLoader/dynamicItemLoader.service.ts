import {Logger} from '@anglr/common';
import {Dictionary, resolvePromiseOr} from '@jscrpt/common';

import {DynamicModuleProvider, DynamicItemLoaderValidatorFn} from './dynamicItemLoader.interface';
import {DynamicModule, DynamicItemSource} from '../../interfaces';
import {DynamicModuleDataExtractor} from '../dynamicModuleDataExtractor/dynamicModuleDataExtractor.service';

/**
 * Service used for loading dynamic items
 */
export class DynamicItemLoader<TDynamicItemDef = any>
{
    //######################### protected cache #########################

    /**
     * Cached dynamic items definition
     */
    protected _cachedDynamicItems: Dictionary<TDynamicItemDef|null> = {};

    //######################### constructors #########################
    constructor(protected _providers: DynamicModuleProvider[],
                protected _extractors: DynamicModuleDataExtractor<TDynamicItemDef>[],
                protected _validatorFn: DynamicItemLoaderValidatorFn<TDynamicItemDef>,
                protected _logger?: Logger,)
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
     * Loads dynamic item, or null if not found
     * @param source - Definition of source for dynamic item
     */
    public async loadItem(source: DynamicItemSource): Promise<TDynamicItemDef|null>
    {
        let dynamicModule: DynamicModule|null = null;
        const cacheId = `${source.package}-${source.name}`;

        //try to get from cache
        if(cacheId in this._cachedDynamicItems)
        {
            this._logger?.verbose('DynamicItemLoader: Loading from cache {@source}', {name: source.name, package: source.package});

            return this._cachedDynamicItems[cacheId];
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
            const dynamicItem = extractor.tryToExtract(dynamicModule);

            if(dynamicItem)
            {
                this._cachedDynamicItems[cacheId] = this._validatorFn(dynamicItem) ? dynamicItem : null; 

                if(!this._cachedDynamicItems[cacheId])
                {
                    this._logger?.warn('DynamicItemLoader: Found dynamic item {@source} is not of requested type', {name: source.name, package: source.package});        
                }

                return this._cachedDynamicItems[cacheId];

            }
        }

        this._logger?.debug('DynamicItemLoader: Failed to extract dynamic item {@source}', {name: source.name, package: source.package});

        this._cachedDynamicItems[cacheId] = null;

        return null;
    }
}