import {inject, InjectFlags, InjectionToken, Type} from '@angular/core';
import {DynamicItemLoader, DynamicModuleDataExtractor, DynamicModuleProvider} from '@anglr/dynamic';
import {LOGGER} from '@anglr/common';
import {Dictionary} from '@jscrpt/common';

import {PropertyTypeControl} from '../interfaces';
import {InputBooleanComponent, InputStringComponent} from '../modules/propertyTypeControls';
import {LayoutPropertyMetadata} from './types';
import {LayoutModuleTypes} from '../components/componentsPalette/componentsPalette.interface';
import {isLayoutModuleTypes} from './utils';

/**
 * Injection token containing symbols to properties storing layout editor property metadata
 */
export const LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES: InjectionToken<symbol[]> = new InjectionToken<symbol[]>('LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES', {providedIn: 'root', factory: () => [LayoutPropertyMetadata]});

/**
 * Injection token containing available property type controls
 */
export const LAYOUT_EDITOR_PROPERTY_TYPE_CONTROLS: InjectionToken<Dictionary<Type<PropertyTypeControl>>> = new InjectionToken<Dictionary<Type<PropertyTypeControl>>>('LAYOUT_EDITOR_PROPERTY_TYPE_CONTROLS',
                                                                                                                                                                     {
                                                                                                                                                                         providedIn: 'root',
                                                                                                                                                                         factory: () =>
                                                                                                                                                                         {
                                                                                                                                                                             return {
                                                                                                                                                                                 'inputString': InputStringComponent,
                                                                                                                                                                                 'inputBoolean': InputBooleanComponent,
                                                                                                                                                                             };
                                                                                                                                                                         }});

/**
 * Injection token for layout module types data extractors
 */
export const LAYOUT_MODULE_TYPES_DATA_EXTRACTORS: InjectionToken<DynamicModuleDataExtractor[]> = new InjectionToken<DynamicModuleDataExtractor[]>('LAYOUT_MODULE_TYPES_DATA_EXTRACTORS');

/**
 * Injection token for layout module types providers
 */
export const LAYOUT_MODULE_TYPES_PROVIDERS: InjectionToken<DynamicModuleProvider[]> = new InjectionToken<DynamicModuleProvider[]>('LAYOUT_MODULE_TYPES_PROVIDERS');

/**
 * Injection token for layout module types loader
 */
export const LAYOUT_MODULE_TYPES_LOADER: InjectionToken<DynamicItemLoader<LayoutModuleTypes>> = new InjectionToken<DynamicItemLoader<LayoutModuleTypes>>('LAYOUT_MODULE_TYPES_LOADER', 
                                                                                                                                                         {
                                                                                                                                                             providedIn: 'root',
                                                                                                                                                             factory: () =>
                                                                                                                                                             {
                                                                                                                                                                 return new DynamicItemLoader(inject(LAYOUT_MODULE_TYPES_PROVIDERS),
                                                                                                                                                                                              inject(LAYOUT_MODULE_TYPES_DATA_EXTRACTORS),
                                                                                                                                                                                              isLayoutModuleTypes,
                                                                                                                                                                                              inject(LOGGER, InjectFlags.Optional) ?? undefined);
                                                                                                                                                             }
                                                                                                                                                         });