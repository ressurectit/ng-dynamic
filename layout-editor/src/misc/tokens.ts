import {InjectionToken, Type} from '@angular/core';
import {DynamicItemLoader, DynamicModuleDataExtractor, DynamicModuleProvider} from '@anglr/dynamic';
import {Dictionary} from '@jscrpt/common';

import {PropertyTypeControl} from '../interfaces';
import {LayoutModuleTypes} from '../components/componentsPalette/componentsPalette.interface';
import {InputStringComponent} from '../modules/propertyTypeControls/components/inputString/inputString.component';
import {InputBooleanComponent} from '../modules/propertyTypeControls/components/inputBoolean/inputBoolean.component';
import {SelectValueComponent} from '../modules/propertyTypeControls/components/selectValue/selectValue.component';

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
