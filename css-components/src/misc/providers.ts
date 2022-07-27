import {ClassProvider} from '@angular/core';
import {LAYOUT_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/layout';
import {LAYOUT_MODULE_TYPES_PROVIDERS} from '@anglr/dynamic/layout-editor';

import {CssDynamicModuleItemsProvider, CssDynamicModuleTypesProvider} from '../services';

/**
 * Provider for css package layout components provider
 */
export const CSS_LAYOUT_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_PROVIDERS,
    useClass: CssDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for css dynamic layout module types provider
 */
export const CSS_LAYOUT_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: LAYOUT_MODULE_TYPES_PROVIDERS,
    useClass: CssDynamicModuleTypesProvider,
    multi: true
};