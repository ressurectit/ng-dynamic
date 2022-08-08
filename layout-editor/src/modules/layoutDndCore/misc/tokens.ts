import {InjectionToken} from '@angular/core';

import {DragPreviewRegistrator} from '../interfaces';

/**
 * Injection token used for injecting drag preview registrator instance
 */
export const DRAG_PREVIEW_REGISTRATOR: InjectionToken<DragPreviewRegistrator> = new InjectionToken<DragPreviewRegistrator>('DRAG_PREVIEW_REGISTRATOR');
