import {InjectionToken} from '@angular/core';
import {DynamicItemLoader, DynamicModuleDataExtractor, DynamicModuleProvider, MetadataHistoryManager} from '@anglr/dynamic';
import {Observable} from 'rxjs';

import {RelationsModuleTypes, RelationsNodeDef} from './types';
import {RelationsNodeMetadata} from '../interfaces';

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

/**
 * Injection token for observables that allows refreshing of nodes palatte items
 */
export const REFRESH_PALETTE_OBSERVABLES: InjectionToken<Observable<void>[]> = new InjectionToken<Observable<void>[]>('REFRESH_PALETTE_OBSERVABLES');

/**
 * Injection token for relations history manager
 */
export const RELATIONS_HISTORY_MANAGER: InjectionToken<MetadataHistoryManager<RelationsNodeMetadata[]>> = new InjectionToken<MetadataHistoryManager<RelationsNodeMetadata[]>>('RELATIONS_HISTORY_MANAGER');