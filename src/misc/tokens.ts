import {InjectionToken} from '@angular/core';

import {DynamicItemLoaderExtractor, DynamicItemLoaderProvider} from '../services';

/**
 * Injection token used for obtaining dynamic item loader providers
 */
export const DYNAMIC_ITEM_LOADER_PROVIDERS: InjectionToken<DynamicItemLoaderProvider> = new InjectionToken<DynamicItemLoaderProvider>('DYNAMIC_ITEM_LOADER_PROVIDERS');

/**
 * Injection token used for obtaining dynamic item loader extractors
 */
export const DYNAMIC_ITEM_LOADER_EXTRACTORS: InjectionToken<DynamicItemLoaderExtractor> = new InjectionToken<DynamicItemLoaderExtractor>('DYNAMIC_ITEM_LOADER_EXTRACTOR');
