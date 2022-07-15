import {PromiseOr} from '@jscrpt/common';

import {DynamicItemSource, DynamicModule} from '../../interfaces';

/**
 * Dynamic module provider, used for locating dynamic module and obtaining it
 */
export interface DynamicModuleProvider
{
    //######################### methods #########################

    /**
     * Tries to get dynamic module from source, if it fails returns null
     * @param source - Description of dynamic item source, used for obtaining dynamic module
     */
    tryToGet(source: DynamicItemSource): PromiseOr<DynamicModule|null>|null;
}

/**
 * Function that validates obtained data whether are of requested type
 */
export interface DynamicItemLoaderValidatorFn<TData = any>
{
    /**
     * Takes data and checks whether are of requested type
     * @param data - Data to be checked
     */
    (data: TData): data is TData;
}