import {ClassProvider} from '@angular/core';
import {LAYOUT_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/layout';
import {LAYOUT_MODULE_TYPES_PROVIDERS} from '@anglr/dynamic/layout-editor';

import {HandlebarsDynamicModuleItemsProvider, HandlebarsDynamicModuleTypesProvider} from '../services';

/**
 * Provider for handlebars package layout components provider
 */
export const HANDLEBARS_LAYOUT_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_PROVIDERS,
    useClass: HandlebarsDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for handlebars dynamic layout module types provider
 */
export const HANDLEBARS_LAYOUT_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: LAYOUT_MODULE_TYPES_PROVIDERS,
    useClass: HandlebarsDynamicModuleTypesProvider,
    multi: true
};