import {ClassProvider} from '@angular/core';

import {BasicComponentsDynamicItemLoaderProvider, ModuleDynamicItemLoaderExtractor} from '../services';
import {DYNAMIC_ITEM_LOADER_EXTRACTORS, DYNAMIC_ITEM_LOADER_PROVIDERS} from './tokens';

/**
 * Provider for BasicComponentsDynamicItemLoaderProvider implementation of DynamicItemLoaderProvider
 */
export const BASIC_COMPONENTS_DYNAMIC_ITEM_LOADER_PROVIDER: ClassProvider =
{
    provide: DYNAMIC_ITEM_LOADER_PROVIDERS,
    useClass: BasicComponentsDynamicItemLoaderProvider,
    multi: true
};

/**
 * Provider for ModuleDynamicItemLoaderExtractor implementation of DynamicItemLoaderExtractor
 */
export const MODULE_DYNAMIC_ITEM_LOADER_EXTRACTOR: ClassProvider =
{
    provide: DYNAMIC_ITEM_LOADER_EXTRACTORS,
    useClass: ModuleDynamicItemLoaderExtractor,
    multi: true
};