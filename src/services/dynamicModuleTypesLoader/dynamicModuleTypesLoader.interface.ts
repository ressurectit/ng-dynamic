import {PromiseOr} from '@jscrpt/common';

import {DynamicModule} from '../../interfaces';

/**
 * Dynamic module types provider, used for locating module dynamic types and obtaining it from it
 */
export interface DynamicModuleTypesProvider
{
    //######################### methods #########################

    /**
     * Tries to get dynamic module from source, if it fails returns null
     * @param moduleName - Name of module containing dynamic types
     */
    tryToGet(moduleName: string): PromiseOr<DynamicModule|null>|null;
}
