import {PromiseOr} from '@jscrpt/common';

import {DynamicItemSource, DynamicModule} from '../../interfaces';

/**
 * Dynamic item loader provider, used for locating dynamic item and obtaining it from it
 */
export interface DynamicItemLoaderProvider
{
    //######################### methods #########################

    /**
     * Tries to get dynamic from source, if it fails returns null
     * @param source - Description of dynamic item source, used for obtaining dynamic item
     */
    tryToGet(source: DynamicItemSource): PromiseOr<DynamicModule|null>|null;
}
