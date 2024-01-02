import {ClassProvider} from '@angular/core';
import {DynamicFeature, provideStaticPackageSource} from '@anglr/dynamic';
import {LAYOUT_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/layout';
import {LAYOUT_MODULE_TYPES_PROVIDERS} from '@anglr/dynamic/layout-editor';
import {RELATIONS_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/relations';
import {RELATIONS_MODULE_TYPES_PROVIDERS, RELATIONS_NODES_PROVIDERS} from '@anglr/dynamic/relations-editor';

import {MaterialDynamicModuleItemsProvider, MaterialDynamicModuleRelationsProvider, MaterialDynamicModuleTypesProvider} from '../services';

/**
 * Provider for material package layout components provider
 */
const MATERIAL_LAYOUT_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_PROVIDERS,
    useClass: MaterialDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for material dynamic layout module types provider
 */
const MATERIAL_LAYOUT_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: LAYOUT_MODULE_TYPES_PROVIDERS,
    useClass: MaterialDynamicModuleTypesProvider,
    multi: true
};

/**
 * Provider for material dynamic relations types provider
 */
const MATERIAL_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: MaterialDynamicModuleRelationsProvider,
    multi: true
};

/**
 * Provider for material package relations nodes provider
 */
const MATERIAL_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: MaterialDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for material package relations components provider
 */
const MATERIAL_RELATIONS_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: RELATIONS_COMPONENTS_MODULE_PROVIDERS,
    useClass: MaterialDynamicModuleItemsProvider,
    multi: true
};

/**
 * Enables use of material components feature
 */
export function withMaterialComponents(): DynamicFeature
{
    return new DynamicFeature(
    {
        layoutRuntime:
        {
            prependProviders: [],
            providers: 
            [
                MATERIAL_LAYOUT_COMPONENTS_PROVIDER,
            ],
        },
        layoutEditor:
        {
            prependProviders: [],
            providers: 
            [
                MATERIAL_LAYOUT_MODULE_TYPES_PROVIDER,
                provideStaticPackageSource('material-components'),
            ],
        },
        relationsRuntime:
        {
            prependProviders: [],
            providers: 
            [
                MATERIAL_RELATIONS_COMPONENTS_PROVIDER,
            ],
        },
        relationsEditor:
        {
            prependProviders: [],
            providers: 
            [
                MATERIAL_RELATIONS_MODULE_TYPES_PROVIDER,
                MATERIAL_RELATIONS_NODES_PROVIDER,
                provideStaticPackageSource('material-components'),
            ],
        },
    });
}