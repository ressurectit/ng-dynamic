import {ClassProvider} from '@angular/core';

import {BasicComponentsDynamicItemLoaderProvider, DefaultDynamicModuleDataExtractor} from '../services';
import {DYNAMIC_MODULE_DATA_EXTRACTORS, DYNAMIC_ITEM_LOADER_PROVIDERS} from './tokens';

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
 * Provider for DefaultDynamicModuleDataExtractor implementation of DynamicModuleDataExtractor
 */
export const DEFAULT_DYNAMIC_MODULE_DATA_EXTRACTORS: ClassProvider =
{
    provide: DYNAMIC_MODULE_DATA_EXTRACTORS,
    useClass: DefaultDynamicModuleDataExtractor,
    multi: true
};