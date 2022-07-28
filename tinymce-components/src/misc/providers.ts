import {ClassProvider} from '@angular/core';
import {LAYOUT_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/layout';
import {LAYOUT_MODULE_TYPES_PROVIDERS} from '@anglr/dynamic/layout-editor';
import {RELATIONS_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/relations';
import {RELATIONS_MODULE_TYPES_PROVIDERS, RELATIONS_NODES_PROVIDERS} from '@anglr/dynamic/relations-editor';

import {TinyMceDynamicModuleItemsProvider, TinyMceDynamicModuleRelationsProvider, TinyMceDynamicModuleTypesProvider} from '../services';

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

/**
 * Provider for tiny MCE dynamic relations types provider
 */
export const TINY_MCE_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: TinyMceDynamicModuleRelationsProvider,
    multi: true
};

/**
 * Provider for tiny MCE package relations nodes provider
 */
export const TINY_MCE_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: TinyMceDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for tiny MCE package relations components provider
 */
export const TINY_MCE_RELATIONS_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: RELATIONS_COMPONENTS_MODULE_PROVIDERS,
    useClass: TinyMceDynamicModuleItemsProvider,
    multi: true
};