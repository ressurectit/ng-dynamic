import {InjectionToken, Type} from '@angular/core';
import {Dictionary} from '@jscrpt/common';

import {PropertyTypeControl} from '../interfaces';
import {InputBooleanComponent, InputStringComponent} from '../modules/propertyTypeControls';
import {LayoutPropertyMetadata} from './types';

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