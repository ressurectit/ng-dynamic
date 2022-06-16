import {PromiseOr} from '@jscrpt/common';

import {DynamicItemSource, DynamicItemModule, DynamicItemType} from '../../metadata';

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
    tryToGet(source: DynamicItemSource): PromiseOr<DynamicItemModule|null>|null;
}

/**
 * Extractor used for extracting dynamic item from dynamic item source result
 */
export interface DynamicItemLoaderExtractor
{
    //######################### methods #########################

    /**
     * Tries to extract dynamic item type from its module
     * @param module - Module containing dynamic item
     */
    tryToExtract(module: DynamicItemModule): DynamicItemType|null;
}