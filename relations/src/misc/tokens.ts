import {inject, InjectFlags, InjectionToken} from '@angular/core';
import {LOGGER} from '@anglr/common';
import {DynamicItemLoader, DynamicModuleDataExtractor, DynamicModuleProvider} from '@anglr/dynamic';

import {RelationsComponentDef} from './types';
import {isRelationsComponentDef} from './utils';

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
export const RELATIONS_COMPONENTS_LOADER: InjectionToken<DynamicItemLoader<RelationsComponentDef>> = new InjectionToken<DynamicItemLoader<RelationsComponentDef>>('RELATIONS_COMPONENTS_LOADER', 
                                                                                                                                                                  {
                                                                                                                                                                      providedIn: 'root',
                                                                                                                                                                      factory: () =>
                                                                                                                                                                      {
                                                                                                                                                                          return new DynamicItemLoader(inject(RELATIONS_COMPONENTS_MODULE_PROVIDERS),
                                                                                                                                                                                                       inject(RELATIONS_COMPONENTS_MODULE_DATA_EXTRACTORS),
                                                                                                                                                                                                       isRelationsComponentDef,
                                                                                                                                                                                                       inject(LOGGER, InjectFlags.Optional) ?? undefined);
                                                                                                                                                                      }
                                                                                                                                                                  });
