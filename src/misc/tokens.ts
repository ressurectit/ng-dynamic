import {InjectionToken} from '@angular/core';
import {Func} from '@jscrpt/common';

/**
 * Injection token used for injectin function that can obtain current state of metadata
 */
export const METADATA_HISTORY_MANAGER_GET_STATE: InjectionToken<Func<any>> = new InjectionToken<Func<any>>('METADATA_HISTORY_MANAGER_GET_STATE');