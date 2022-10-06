import {InjectionToken} from '@angular/core';

//TODO: remove

/**
 * Injection token containing indication whether is layout design mode enabled
 */
export const LAYOUT_DESIGN_MODE: InjectionToken<boolean> = new InjectionToken<boolean>('LAYOUT_DESIGN_MODE', {factory: () => false});
