import {ClassProvider} from '@angular/core';
import {LAYOUT_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/layout';
import {LAYOUT_MODULE_TYPES_PROVIDERS} from '@anglr/dynamic/layout-editor';
import {RELATIONS_MODULE_TYPES_PROVIDERS, RELATIONS_NODES_PROVIDERS} from '@anglr/dynamic/relations-editor';
import {RELATIONS_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/relations';

import {FormDynamicModuleItemsProvider, FormDynamicModuleRelationsProvider, FormDynamicModuleTypesProvider} from '../services';


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
 * Provider for form dynamic layout module types provider
 */
export const FORM_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: LAYOUT_MODULE_TYPES_PROVIDERS,
    useClass: FormDynamicModuleTypesProvider,
    multi: true
};

/**
 * Provider for form dynamic relations types provider
 */
export const FORM_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: FormDynamicModuleRelationsProvider,
    multi: true
};

/**
 * Provider for form package relations nodes provider
 */
export const FORM_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: FormDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for form package relations components provider
 */
export const FORM_RELATIONS_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: RELATIONS_COMPONENTS_MODULE_PROVIDERS,
    useClass: FormDynamicModuleItemsProvider,
    multi: true
};