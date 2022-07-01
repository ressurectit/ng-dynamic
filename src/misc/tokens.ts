import {InjectionToken} from '@angular/core';

import {DynamicModuleDataExtractor} from '../interfaces';
import {DynamicItemExtensionsExtractor, DynamicItemLoaderProvider, DynamicModuleTypesProvider} from '../services';

/**
 * Injection token used for obtaining dynamic item loader providers
 */
export const DYNAMIC_ITEM_LOADER_PROVIDERS: InjectionToken<DynamicItemLoaderProvider[]> = new InjectionToken<DynamicItemLoaderProvider[]>('DYNAMIC_ITEM_LOADER_PROVIDERS');

/**
 * Injection token used for obtaining dynamic module types providers
 */
export const DYNAMIC_MODULE_TYPES_PROVIDER: InjectionToken<DynamicModuleTypesProvider[]> = new InjectionToken<DynamicModuleTypesProvider[]>('DYNAMIC_MODULE_TYPES_PROVIDER');

/**
 * Injection token used for obtaining dynamic module data extractors
 */
export const DYNAMIC_MODULE_DATA_EXTRACTORS: InjectionToken<DynamicModuleDataExtractor[]> = new InjectionToken<DynamicModuleDataExtractor[]>('DYNAMIC_MODULE_DATA_EXTRACTORS');

/**
 * Injection token used for obtaining dynamic item extensions extractors
 */
export const DYNAMIC_ITEM_EXTENSIONS_EXTRACTORS: InjectionToken<DynamicItemExtensionsExtractor[]> = new InjectionToken<DynamicItemExtensionsExtractor[]>('DYNAMIC_ITEM_EXTENSIONS_EXTRACTORS');
