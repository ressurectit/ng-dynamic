import {inject} from '@angular/core';
import {LOGGER, Logger, ProgressIndicatorService} from '@anglr/common';
import {Dictionary} from '@jscrpt/common';

import {DynamicModuleProvider, DynamicItemLoaderValidatorFn} from './dynamicItemLoader.interface';
import {DynamicModule, DynamicItemSource} from '../../interfaces';
import {DynamicModuleDataExtractor} from '../dynamicModuleDataExtractor/dynamicModuleDataExtractor.service';

//TODO: make no chace dynamic, observable

/**
 * Service used for loading dynamic items
 */
export class DynamicItemLoader<TDynamicItemDef = any>
{
    //######################### protected fields #########################

    /**
     * Cached dynamic items definition
     */
    protected cachedDynamicItems: Dictionary<TDynamicItemDef|null> = {};

    /**
     * Instance of logger
     */
    protected logger: Logger = inject(LOGGER);

    /**
     * Service used for displaying progress indicator
     */
    protected progressIndicator: ProgressIndicatorService = inject(ProgressIndicatorService);

    //######################### constructors #########################
    constructor(protected providers: DynamicModuleProvider[],
                protected extractors: DynamicModuleDataExtractor<TDynamicItemDef>[],
                protected validatorFn: DynamicItemLoaderValidatorFn<TDynamicItemDef>,
                protected noCache?: boolean,)
    {
        //providers is not an array
        if(!Array.isArray(this.providers))
        {
            this.logger.error('DynamicItemLoader: missing providers!');

            this.providers = [];
        }

        //extractors is not an array
        if(!Array.isArray(this.extractors))
        {
            this.logger.error('DynamicItemLoader: missing extractors!');

            this.extractors = [];
        }
    }

    //######################### public methods #########################

    /**
     * Loads dynamic item, or null if not found
     * @param source - Definition of source for dynamic item
     */
    public async loadItem(source: DynamicItemSource): Promise<TDynamicItemDef|null>
    {
        try
        {
            this.progressIndicator.showProgress();            

            let dynamicModule: DynamicModule|null = null;
            const cacheId = `${source.package}-${source.name}`;
    
            //try to get from cache
            if(cacheId in this.cachedDynamicItems && !this.noCache)
            {
                this.logger.verbose('DynamicItemLoader: Loading from cache {{@source}}', {source: {name: source.name, package: source.package}});
    
                return this.cachedDynamicItems[cacheId];
            }
    
            //loops all providers, return result from first that returns non null value
            for(const provider of this.providers)
            {
                const asyncDynamicModule = provider.tryToGet(source);
    
                if(asyncDynamicModule)
                {
                    dynamicModule = await asyncDynamicModule;
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
                this.logger.debug('DynamicItemLoader: Failed to get dynamic module {{@source}}', {source: {name: source.name, package: source.package}});
    
                return null;
            }
    
            //loops all extractors, return result from first that returns non null value
            for(const extractor of this.extractors)
            {
                const dynamicItem = await extractor.tryToExtract(dynamicModule);
    
                if(dynamicItem)
                {
                    this.cachedDynamicItems[cacheId] = this.validatorFn(dynamicItem) ? dynamicItem : null; 
    
                    if(!this.cachedDynamicItems[cacheId])
                    {
                        this.logger.warn('DynamicItemLoader: Found dynamic item {{@source}} is not of requested type', {source: {name: source.name, package: source.package}});        
                    }
    
                    return this.cachedDynamicItems[cacheId];
    
                }
            }
    
            this.logger.debug('DynamicItemLoader: Failed to extract dynamic item {{@source}}', {source: {name: source.name, package: source.package}});
    
            this.cachedDynamicItems[cacheId] = null;
    
            return null;
        }
        finally
        {
            this.progressIndicator.hideProgress();
        }
    }
}