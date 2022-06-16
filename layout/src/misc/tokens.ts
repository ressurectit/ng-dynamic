import {InjectionToken} from '@angular/core';

import {LayoutComponentTransform} from '../interfaces';

/**
 * Injection provider for layout component metadata transformation function
 */
export const LAYOUT_COMPONENT_TRANSFORM: InjectionToken<LayoutComponentTransform> = new InjectionToken<LayoutComponentTransform>('LAYOUT_COMPONENT_TRANSFORM');
