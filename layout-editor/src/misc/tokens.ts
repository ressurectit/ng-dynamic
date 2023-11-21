import {InjectionToken, Type} from '@angular/core';
import {DefaultsOverride, DynamicItemLoader, DynamicModuleDataExtractor, DynamicModuleProvider, MetadataHistoryManager} from '@anglr/dynamic';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Dictionary} from '@jscrpt/common';
import {Observable} from 'rxjs';

import {PropertyTypeControl} from '../interfaces';
import {LayoutModuleTypes} from '../components/componentsPalette/componentsPalette.interface';
import {InputStringComponent} from '../modules/propertyTypeControls/components/inputString/inputString.component';
import {InputBooleanComponent} from '../modules/propertyTypeControls/components/inputBoolean/inputBoolean.component';
import {SelectValueComponent} from '../modules/propertyTypeControls/components/selectValue/selectValue.component';
import {TextareaComponent} from '../modules/propertyTypeControls/components/textarea/textarea.component';
import {InputNumberComponent} from '../modules/propertyTypeControls/components/inputNumber/inputNumber.component';

/**
 * Injection token containing symbols to properties storing layout editor property metadata
 */
export const LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES: InjectionToken<symbol[]> = new InjectionToken<symbol[]>('LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES');

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
                                                                                                                                                                                 'selectValue': SelectValueComponent,
                                                                                                                                                                                 'textarea': TextareaComponent,
                                                                                                                                                                                 'inputNumber': InputNumberComponent,
                                                                                                                                                                             };
                                                                                                                                                                         }
                                                                                                                                                                     });

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
export const LAYOUT_MODULE_TYPES_LOADER: InjectionToken<DynamicItemLoader<LayoutModuleTypes>> = new InjectionToken<DynamicItemLoader<LayoutModuleTypes>>('LAYOUT_MODULE_TYPES_LOADER');

/**
 * Injection token for layout history manager
 */
export const LAYOUT_HISTORY_MANAGER: InjectionToken<MetadataHistoryManager<LayoutComponentMetadata>> = new InjectionToken<MetadataHistoryManager<LayoutComponentMetadata>>('LAYOUT_HISTORY_MANAGER');

/**
 * Injection token for observables that allows refreshing of components palatte items
 */
export const REFRESH_PALETTE_OBSERVABLES: InjectionToken<Observable<void>[]> = new InjectionToken<Observable<void>[]>('REFRESH_PALETTE_OBSERVABLES');

/**
 * Injection token for layout defaults override
 */
export const LAYOUT_DEFAULTS_OVERRIDE: InjectionToken<DefaultsOverride> = new InjectionToken<DefaultsOverride>('LAYOUT_DEFAULTS_OVERRIDE');
