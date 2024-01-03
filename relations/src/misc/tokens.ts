import {InjectionToken, Type} from '@angular/core';
import {DynamicItemLoader, DynamicModuleDataExtractor, DynamicModuleProvider, MetadataStorage} from '@anglr/dynamic';

import {RelationsComponentDef} from './types';
import type {RelationsDebugger} from '../services';

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RELATIONS_METADATA_STORAGE: InjectionToken<MetadataStorage<any>> = new InjectionToken<MetadataStorage<any>>('RELATIONS_METADATA_STORAGE');

/**
 * Injection token for indication whether skip relations process initialization
 */
export const RELATIONS_PROCESSOR_SKIP_INIT: InjectionToken<boolean> = new InjectionToken<boolean>('RELATIONS_PROCESSOR_SKIP_INIT');

/**
 * Injection token for type that represents relations debugger implementation
 */
export const RELATIONS_DEBUGGER_TYPE: InjectionToken<Type<RelationsDebugger>> = new InjectionToken<Type<RelationsDebugger>>('RELATIONS_DEBUGGER_TYPE');
