import {ClassProvider} from '@angular/core';
import {DYNAMIC_ITEM_LOADER_PROVIDERS} from '@anglr/dynamic';

import {LayoutDesignerDynamicItemLoaderProvider} from '../services';

/**
 * Provider for LayoutDesignerDynamicItemLoaderProvider implementation of DynamicItemLoaderProvider
 */
export const LAYOUT_DESIGNER_DYNAMIC_ITEM_LOADER_PROVIDER: ClassProvider =
{
    provide: DYNAMIC_ITEM_LOADER_PROVIDERS,
    useClass: LayoutDesignerDynamicItemLoaderProvider,
    multi: true
};