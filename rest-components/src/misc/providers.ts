import {ClassProvider} from '@angular/core';
import {RELATIONS_MODULE_TYPES_PROVIDERS, RELATIONS_NODES_PROVIDERS} from '@anglr/dynamic/relations-editor';
import {RELATIONS_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/relations';

import {RestDynamicModuleItemsProvider, RestDynamicModuleRelationsProvider} from '../services';

/**
 * Provider for rest dynamic relations types provider
 */
export const REST_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: RestDynamicModuleRelationsProvider,
    multi: true
};

/**
 * Provider for rest package relations nodes provider
 */
export const REST_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: RestDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for rest package relations components provider
 */
export const REST_RELATIONS_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: RELATIONS_COMPONENTS_MODULE_PROVIDERS,
    useClass: RestDynamicModuleItemsProvider,
    multi: true
};