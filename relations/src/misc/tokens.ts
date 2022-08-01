import {InjectionToken} from '@angular/core';
import {DynamicItemLoader, DynamicModuleDataExtractor, DynamicModuleProvider, MetadataStorage} from '@anglr/dynamic';

import {RelationsComponentDef} from './types';

/**
 * Injection token for relations components module data extractors
 */
export const RELATIONS_COMPONENTS_MODULE_DATA_EXTRACTORS: InjectionToken<DynamicModuleDataExtractor[]> = new InjectionToken<DynamicModuleDataExtractor[]>('RELATIONS_COMPONENTS_MODULE_DATA_EXTRACTORS');

/**
 * Injection token for relations components module providers
 */
export const RELATIONS_COMPONENTS_MODULE_PROVIDERS: InjectionToken<DynamicModuleProvider[]> = new InjectionToken<DynamicModuleProvider[]>('RELATIONS_COMPONENTS_MODULE_PROVIDERS');

/**
 * Injection token for relations components loader
 */
export const RELATIONS_COMPONENTS_LOADER: InjectionToken<DynamicItemLoader<RelationsComponentDef>> = new InjectionToken<DynamicItemLoader<RelationsComponentDef>>('RELATIONS_COMPONENTS_LOADER');

/**
 * Injection token for metadata storage set up for relations
 */
export const RELATIONS_METADATA_STORAGE: InjectionToken<MetadataStorage> = new InjectionToken<MetadataStorage>('RELATIONS_METADATA_STORAGE');
