import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {resolvePromiseOr} from '@jscrpt/common';

import {DYNAMIC_MODULE_DATA_EXTRACTORS, DYNAMIC_MODULE_TYPES_PROVIDER} from '../../misc/tokens';
import {DynamicModule, DynamicModuleDataExtractor} from '../../interfaces';
import {DynamicModuleTypesProvider} from './dynamicModuleTypesLoader.interface';

/**
 * Service used for loading dynamic module types
 */
@Injectable({providedIn: 'root'})
export class DynamicModuleTypesLoader
{
    //######################### constructors #########################
    constructor(@Inject(DYNAMIC_MODULE_TYPES_PROVIDER) protected _providers: DynamicModuleTypesProvider[],
                @Inject(DYNAMIC_MODULE_DATA_EXTRACTORS) protected _extractors: DynamicModuleDataExtractor<string[]>[],
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
        //providers is not an array
        if(!Array.isArray(this._providers))
        {
            this._logger?.error('DynamicModuleTypesLoader: missing providers!');

            this._providers = [];
        }

        //extractors is not an array
        if(!Array.isArray(this._extractors))
        {
            this._logger?.error('DynamicModuleTypesLoader: missing extractors!');

            this._extractors = [];
        }
    }

    //######################### public methods #########################

    /**
     * Loads dynamic module types, or null if not found
     * @param moduleName - Name of module containing dynamic types
     */
    public async loadTypes(moduleName: string): Promise<string[]|null>
    {
        let dynamicModule: DynamicModule|null = null;

        //loops all providers, return result from first that returns non null value
        for(const provider of this._providers)
        {
            const asyncDynamicModule = provider.tryToGet(moduleName);

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
            this._logger?.debug('DynamicModuleTypesLoader: Failed to get dynamic module {@source}', {moduleName});

            return null;
        }

        //loops all extractors, return result from first that returns non null value
        for(const extractor of this._extractors)
        {
            const dynamicItemType = extractor.tryToExtract(dynamicModule);

            if(dynamicItemType)
            {
                return dynamicItemType;
            }
        }

        this._logger?.debug('DynamicModuleTypesLoader: Failed to extract dynamic module types {@source}', {moduleName});

        return null;
    }
}