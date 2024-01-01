import {ClassProvider} from '@angular/core';
import {DynamicFeature, provideStaticPackageSource} from '@anglr/dynamic';
import {LAYOUT_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/layout';
import {LAYOUT_MODULE_TYPES_PROVIDERS} from '@anglr/dynamic/layout-editor';
import {RELATIONS_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/relations';
import {RELATIONS_MODULE_TYPES_PROVIDERS, RELATIONS_NODES_PROVIDERS} from '@anglr/dynamic/relations-editor';

import {BasicDynamicModuleItemsProvider, BasicDynamicModuleRelationsProvider, BasicDynamicModuleTypesProvider} from '../services';

/**
 * Provider for basic package layout components provider
 */
const BASIC_LAYOUT_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_PROVIDERS,
    useClass: BasicDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for basic dynamic layout module types provider
 */
const BASIC_LAYOUT_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: LAYOUT_MODULE_TYPES_PROVIDERS,
    useClass: BasicDynamicModuleTypesProvider,
    multi: true
};

/**
 * Provider for basic dynamic relations types provider
 */
const BASIC_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: BasicDynamicModuleRelationsProvider,
    multi: true
};

/**
 * Provider for basic package relations nodes provider
 */
const BASIC_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: BasicDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for basic package relations components provider
 */
const BASIC_RELATIONS_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: RELATIONS_COMPONENTS_MODULE_PROVIDERS,
    useClass: BasicDynamicModuleItemsProvider,
    multi: true
};

/**
 * Enables use of basic components feature
 */
export function withBasicComponents(): DynamicFeature
{
    return new DynamicFeature(
    {
        layoutRuntime:
        {
            prependProviders: [],
            providers: 
            [
                BASIC_LAYOUT_COMPONENTS_PROVIDER,
            ],
        },
        layoutEditor:
        {
            prependProviders: [],
            providers: 
            [
                BASIC_LAYOUT_MODULE_TYPES_PROVIDER,
                provideStaticPackageSource('basic-components'),
            ],
        },
        relationsRuntime:
        {
            prependProviders: [],
            providers: 
            [
                BASIC_RELATIONS_COMPONENTS_PROVIDER,
            ],
        },
        relationsEditor:
        {
            prependProviders: [],
            providers: 
            [
                BASIC_RELATIONS_MODULE_TYPES_PROVIDER,
                BASIC_RELATIONS_NODES_PROVIDER,
                provideStaticPackageSource('basic-components'),
            ],
        },
    });
}