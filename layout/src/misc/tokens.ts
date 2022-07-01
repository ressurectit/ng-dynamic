import {InjectionToken, Type} from '@angular/core';
import {DynamicItemExtension} from '@anglr/dynamic';

import {LayoutComponentTransform} from '../interfaces';

/**
 * Injection token for layout component metadata transformation function
 */
export const LAYOUT_COMPONENT_TRANSFORM: InjectionToken<LayoutComponentTransform> = new InjectionToken<LayoutComponentTransform>('LAYOUT_COMPONENT_TRANSFORM');

/**
 * Injection token for layout component child extension types
 */
export const LAYOUT_COMPONENT_CHILD_EXTENSIONS: InjectionToken<Type<DynamicItemExtension>[]> = new InjectionToken<Type<DynamicItemExtension>[]>('LAYOUT_COMPONENT_CHILD_EXTENSIONS');
