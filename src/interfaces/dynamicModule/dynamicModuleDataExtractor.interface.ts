import {DynamicModule} from './dynamicModule.interface';

/**
 * Extractor used for extracting dynamic data from dynamic module
 */
export interface DynamicModuleDataExtractor<TData = any>
{
    //######################### methods #########################

    /**
     * Tries to extract dynamic data from dynamic module
     * @param module - Module containing dynamic data
     */
    tryToExtract(module: DynamicModule): TData|null;
}