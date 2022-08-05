import {Logger} from '@anglr/common';
import {Dictionary, extend, isEmptyObject} from '@jscrpt/common';

import {DynamicModule} from '../../interfaces';
import {DynamicModuleDataExtractorFn} from './dynamicModuleDataExtractor.interface';

/**
 * Extractor used for extracting dynamic data from dynamic module
 */
export class DynamicModuleDataExtractor<TData extends Dictionary<any> = any>
{
    //######################### constructor #########################

    /**
     * Creates new instance of DynamicModuleDataExtractor
     * @param _extractorFunctions - Array of extractor functions used to create result
     * @param _logger - Instance of logger used for logging, optional
     */
    constructor(protected _extractorFunctions: DynamicModuleDataExtractorFn[],
                protected _logger?: Logger,)
    {
        //extractor functions is not an array
        if(!Array.isArray(this._extractorFunctions))
        {
            this._logger?.error('DynamicModuleDataExtractor: missing extractor functions!');

            this._extractorFunctions = [];
        }
    }

    //######################### public methods #########################

    /**
     * Tries to extract dynamic data from dynamic module
     * @param module - Module containing dynamic data
     */
    public async tryToExtract(module: DynamicModule): Promise<TData|null>
    {
        const result: TData = {} as any;

        for(const fn of this._extractorFunctions)
        {
            extend(true, result, await fn(module, this._logger));
        }

        if(isEmptyObject(result))
        {
            return null;
        }

        return result;
    }
}