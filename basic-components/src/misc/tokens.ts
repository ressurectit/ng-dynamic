import {InjectionToken} from '@angular/core';

import {ButtonPreset} from '../interfaces';

/**
 * Injection token for buttons presets
 */
export const BUTTONS_PRESETS: InjectionToken<ButtonPreset[]> = new InjectionToken<ButtonPreset[]>('BUTTONS_PRESETS');