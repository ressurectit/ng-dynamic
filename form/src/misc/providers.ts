import {ClassProvider} from '@angular/core';
import {LAYOUT_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/layout';
import {LAYOUT_MODULE_TYPES_PROVIDERS} from '@anglr/dynamic/layout-editor';

import {FormDynamicModuleItemsProvider, FormDynamicModuleTypesProvider} from '../services';


/**
 * Provider for form components providers
 */
export const FORM_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_PROVIDERS,
    useClass: FormDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for css dynamic layout module types provider
 */
export const FORM_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: LAYOUT_MODULE_TYPES_PROVIDERS,
    useClass: FormDynamicModuleTypesProvider,
    multi: true
};