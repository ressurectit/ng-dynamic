import {InjectionToken} from '@angular/core';
import {DynamicItemExtensionType, DynamicItemLoader, DynamicModuleDataExtractor, DynamicModuleProvider, MetadataStorage} from '@anglr/dynamic';

import {LayoutComponentTransform} from '../interfaces';
import {LayoutComponentDef} from './types';

/**
 * Injection token for layout component metadata transformation function
 */
export const LAYOUT_COMPONENT_TRANSFORM: InjectionToken<LayoutComponentTransform> = new InjectionToken<LayoutComponentTransform>('LAYOUT_COMPONENT_TRANSFORM');

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
export const LAYOUT_METADATA_STORAGE: InjectionToken<MetadataStorage> = new InjectionToken<MetadataStorage>('LAYOUT_METADATA_STORAGE');
