import {Logger} from '@anglr/common';
import {extend, isEmptyObject} from '@jscrpt/common';

import {DynamicModule} from '../../interfaces';
import {DynamicModuleDataExtractorFn} from './dynamicModuleDataExtractor.interface';

/**
 * Extractor used for extracting dynamic data from dynamic module
 */
export class DynamicModuleDataExtractor<TData = any>
{
    //######################### constructor #########################

    /**
     * Creates new instance of DynamicModuleDataExtractor
     * @param extractorFunctions - Array of extractor functions used to create result
     * @param logger - Instance of logger used for logging, optional
     */
    constructor(protected extractorFunctions: DynamicModuleDataExtractorFn[],
                protected logger: Logger,)
    {
        //extractor functions is not an array
        if(!Array.isArray(this.extractorFunctions))
        {
            this.logger.error('DynamicModuleDataExtractor: missing extractor functions!');

            this.extractorFunctions = [];
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

        for(const fn of this.extractorFunctions)
        {
            extend(true, result, await fn(module, this.logger));
        }

        if(isEmptyObject(result))
        {
            return null;
        }

        return result;
    }
}