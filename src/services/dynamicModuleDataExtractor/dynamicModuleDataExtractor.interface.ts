import {Logger} from '@anglr/common';
import {PromiseOr} from '@jscrpt/common';

import {DynamicModule} from '../../interfaces';

/**
 * Function that extracts data from dynamic module
 */
export interface DynamicModuleDataExtractorFn<TData = any>
{
    /**
     * Tries to extract data from module
     * @param module - Module containing dynamic data
     * @param logger - Instance of logger used for logging, optional
     */
    (module: DynamicModule, logger?: Logger): PromiseOr<TData|null>|null;
}