import {InjectionToken} from '@angular/core';
import {DynamicItemLoader, DynamicModuleDataExtractor, DynamicModuleProvider} from '@anglr/dynamic';

import {RelationsModuleTypes, RelationsNodeDef} from './types';

/**
 * Injection token for relations module types data extractors
 */
export const RELATIONS_MODULE_TYPES_DATA_EXTRACTORS: InjectionToken<DynamicModuleDataExtractor[]> = new InjectionToken<DynamicModuleDataExtractor[]>('RELATIONS_MODULE_TYPES_DATA_EXTRACTORS');

/**
 * Injection token for relations module types providers
 */
export const RELATIONS_MODULE_TYPES_PROVIDERS: InjectionToken<DynamicModuleProvider[]> = new InjectionToken<DynamicModuleProvider[]>('RELATIONS_MODULE_TYPES_PROVIDERS');

/**
 * Injection token for relations module types loader
 */
export const RELATIONS_MODULE_TYPES_LOADER: InjectionToken<DynamicItemLoader<RelationsModuleTypes>> = new InjectionToken<DynamicItemLoader<RelationsModuleTypes>>('RELATIONS_MODULE_TYPES_LOADER');

/**
 * Injection token for relations nodes data extractors
 */
export const RELATIONS_NODES_DATA_EXTRACTORS: InjectionToken<DynamicModuleDataExtractor[]> = new InjectionToken<DynamicModuleDataExtractor[]>('RELATIONS_NODES_DATA_EXTRACTORS');

/**
 * Injection token for relations nodes providers
 */
export const RELATIONS_NODES_PROVIDERS: InjectionToken<DynamicModuleProvider[]> = new InjectionToken<DynamicModuleProvider[]>('RELATIONS_NODES_PROVIDERS');

/**
 * Injection token for relations nodes loader
 */
export const RELATIONS_NODES_LOADER: InjectionToken<DynamicItemLoader<RelationsNodeDef>> = new InjectionToken<DynamicItemLoader<RelationsNodeDef>>('RELATIONS_NODES_LOADER');
