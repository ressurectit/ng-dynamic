import {Inject, Injectable, Optional} from '@angular/core';
import {LOGGER, Logger} from '@anglr/common';
import {isPresent} from '@jscrpt/common';

import {DynamicModule, DynamicModuleDataExtractor} from '../../interfaces';

/**
 * Module with default export
 */
interface ɵDynamicModuleWithDefault<TData = any> extends DynamicModule
{
    /**
     * Default export value
     */
    default?: TData;
}

/**
 * Extracts dynamic data which is module exports as default export
 */
@Injectable()
export class DefaultDynamicModuleDataExtractor<TData = any> implements DynamicModuleDataExtractor<TData>
{
    //######################### constructor #########################
    constructor(@Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of DynamicModuleDataExtractor #########################

    /**
     * @inheritdoc
     */
    public tryToExtract(module: DynamicModule): TData|null
    {
        const localModule = module as ɵDynamicModuleWithDefault;

        this._logger?.debug('DefaultDynamicModuleDataExtractor: trying to extract dynamic data');

        if(isPresent(localModule.default))
        {
            return localModule.default;
        }

        return null;
    }
}