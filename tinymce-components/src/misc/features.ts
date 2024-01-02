import {ClassProvider} from '@angular/core';
import {DynamicFeature, provideStaticPackageSource} from '@anglr/dynamic';
import {LAYOUT_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/layout';
import {LAYOUT_MODULE_TYPES_PROVIDERS} from '@anglr/dynamic/layout-editor';
import {RELATIONS_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/relations';
import {RELATIONS_MODULE_TYPES_PROVIDERS, RELATIONS_NODES_PROVIDERS} from '@anglr/dynamic/relations-editor';

import {TinyMceDynamicModuleItemsProvider, TinyMceDynamicModuleRelationsProvider, TinyMceDynamicModuleTypesProvider} from '../services';

/**
 * Provider for tiny MCE package layout components provider
 */
const TINY_MCE_LAYOUT_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_PROVIDERS,
    useClass: TinyMceDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for tiny MCE dynamic layout module types provider
 */
const TINY_MCE_LAYOUT_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: LAYOUT_MODULE_TYPES_PROVIDERS,
    useClass: TinyMceDynamicModuleTypesProvider,
    multi: true
};

/**
 * Provider for tiny MCE dynamic relations types provider
 */
const TINY_MCE_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: TinyMceDynamicModuleRelationsProvider,
    multi: true
};

/**
 * Provider for tiny MCE package relations nodes provider
 */
const TINY_MCE_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: TinyMceDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for tiny MCE package relations components provider
 */
const TINY_MCE_RELATIONS_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: RELATIONS_COMPONENTS_MODULE_PROVIDERS,
    useClass: TinyMceDynamicModuleItemsProvider,
    multi: true
};

/**
 * Enables use of tiny MCE components feature
 */
export function withTinyMceComponents(): DynamicFeature
{
    return new DynamicFeature(
    {
        layoutRuntime:
        {
            prependProviders: [],
            providers: 
            [
                TINY_MCE_LAYOUT_COMPONENTS_PROVIDER,
            ],
        },
        layoutEditor:
        {
            prependProviders: [],
            providers: 
            [
                TINY_MCE_LAYOUT_MODULE_TYPES_PROVIDER,
                provideStaticPackageSource('tinymce-components'),
            ],
        },
        relationsRuntime:
        {
            prependProviders: [],
            providers: 
            [
                TINY_MCE_RELATIONS_COMPONENTS_PROVIDER,
            ],
        },
        relationsEditor:
        {
            prependProviders: [],
            providers: 
            [
                TINY_MCE_RELATIONS_MODULE_TYPES_PROVIDER,
                TINY_MCE_RELATIONS_NODES_PROVIDER,
                provideStaticPackageSource('tinymce-components'),
            ],
        },
    });
}