import {ClassProvider} from '@angular/core';
import {LAYOUT_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/layout';
import {LAYOUT_MODULE_TYPES_PROVIDERS} from '@anglr/dynamic/layout-editor';
import {RELATIONS_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/relations';
import {RELATIONS_MODULE_TYPES_PROVIDERS, RELATIONS_NODES_PROVIDERS} from '@anglr/dynamic/relations-editor';

import {BasicDynamicModuleItemsProvider, BasicDynamicModuleRelationsProvider, BasicDynamicModuleTypesProvider} from '../services';

/**
 * Provider for basic package layout components provider
 */
export const BASIC_LAYOUT_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_PROVIDERS,
    useClass: BasicDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for basic dynamic layout module types provider
 */
export const BASIC_LAYOUT_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: LAYOUT_MODULE_TYPES_PROVIDERS,
    useClass: BasicDynamicModuleTypesProvider,
    multi: true
};

/**
 * Provider for basic dynamic relations types provider
 */
export const BASIC_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: BasicDynamicModuleRelationsProvider,
    multi: true
};

/**
 * Provider for basic package relations nodes provider
 */
export const BASIC_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: BasicDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for basic package relations components provider
 */
export const BASIC_RELATIONS_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: RELATIONS_COMPONENTS_MODULE_PROVIDERS,
    useClass: BasicDynamicModuleItemsProvider,
    multi: true
};