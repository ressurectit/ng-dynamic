import {ClassProvider} from '@angular/core';
import {LAYOUT_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/layout';
import {LAYOUT_MODULE_TYPES_PROVIDERS} from '@anglr/dynamic/layout-editor';

import {TinyMceDynamicModuleItemsProvider, TinyMceDynamicModuleTypesProvider} from '../services';

/**
 * Provider for tiny MCE package layout components provider
 */
export const TINY_MCE_LAYOUT_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_PROVIDERS,
    useClass: TinyMceDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for tiny MCE dynamic layout module types provider
 */
export const TINY_MCE_LAYOUT_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: LAYOUT_MODULE_TYPES_PROVIDERS,
    useClass: TinyMceDynamicModuleTypesProvider,
    multi: true
};