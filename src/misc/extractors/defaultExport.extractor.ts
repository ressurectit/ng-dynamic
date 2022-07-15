import {isPresent} from '@jscrpt/common';

import {DynamicItemDefData, DynamicModule} from '../../interfaces';
import {DynamicModuleDataExtractorFn} from '../../services';

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
export const defaultExportExtractor: DynamicModuleDataExtractorFn<DynamicItemDefData> = (module, logger) =>
{
    const localModule = module as ɵDynamicModuleWithDefault;

    logger?.debug('defaultExportExtractor: trying to extract default dynamic data');

    if(isPresent(localModule.default))
    {
        return {
            data: localModule.default
        };
    }

    return null;
};