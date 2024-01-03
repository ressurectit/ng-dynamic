import {InjectionToken} from '@angular/core';
import {DynamicItemExtensionType, DynamicItemLoader, DynamicModuleDataExtractor, DynamicModuleProvider, MetadataStorage} from '@anglr/dynamic';

import {LayoutComponentDef} from './types';

/**
 * Injection token for layout component child extension types
 */
export const LAYOUT_COMPONENT_CHILD_EXTENSIONS: InjectionToken<DynamicItemExtensionType[]> = new InjectionToken<DynamicItemExtensionType[]>('LAYOUT_COMPONENT_CHILD_EXTENSIONS');

/**
 * Injection token for layout components module data extractors
 */
export const LAYOUT_COMPONENTS_MODULE_DATA_EXTRACTORS: InjectionToken<DynamicModuleDataExtractor[]> = new InjectionToken<DynamicModuleDataExtractor[]>('LAYOUT_COMPONENTS_MODULE_DATA_EXTRACTORS');

/**
 * Injection token for layout components module providers
 */
export const LAYOUT_COMPONENTS_MODULE_PROVIDERS: InjectionToken<DynamicModuleProvider[]> = new InjectionToken<DynamicModuleProvider[]>('LAYOUT_COMPONENTS_MODULE_PROVIDERS');

/**
 * Injection token for layout components loader
 */
export const LAYOUT_COMPONENTS_LOADER: InjectionToken<DynamicItemLoader<LayoutComponentDef>> = new InjectionToken<DynamicItemLoader<LayoutComponentDef>>('LAYOUT_COMPONENTS_LOADER');

/**
 * Injection token for metadata storage set up for layout
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LAYOUT_METADATA_STORAGE: InjectionToken<MetadataStorage<any>> = new InjectionToken<MetadataStorage<any>>('LAYOUT_METADATA_STORAGE');
