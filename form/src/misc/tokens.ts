import {InjectionToken} from '@angular/core';
import {AbstractControl} from '@angular/forms';

/**
 * Injection token for form component control
 */
export const FORM_COMPONENT_CONTROL : InjectionToken<AbstractControl> = new InjectionToken<AbstractControl>('FORM_COMPONENT_CONTROL');