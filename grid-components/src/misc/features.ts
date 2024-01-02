import {ClassProvider} from '@angular/core';
import {DynamicFeature, provideStaticPackageSource} from '@anglr/dynamic';
import {LAYOUT_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/layout';
import {LAYOUT_MODULE_TYPES_PROVIDERS} from '@anglr/dynamic/layout-editor';
import {RELATIONS_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/relations';
import {RELATIONS_MODULE_TYPES_PROVIDERS, RELATIONS_NODES_PROVIDERS} from '@anglr/dynamic/relations-editor';

import {GridDynamicModuleItemsProvider, GridDynamicModuleRelationsProvider, GridDynamicModuleTypesProvider} from '../services';

/**
 * Provider for grid package layout components provider
 */
const GRID_LAYOUT_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_PROVIDERS,
    useClass: GridDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for grid dynamic layout module types provider
 */
const GRID_LAYOUT_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: LAYOUT_MODULE_TYPES_PROVIDERS,
    useClass: GridDynamicModuleTypesProvider,
    multi: true
};

/**
 * Provider for grid dynamic relations types provider
 */
const GRID_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: GridDynamicModuleRelationsProvider,
    multi: true
};

/**
 * Provider for grid package relations nodes provider
 */
const GRID_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: GridDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for grid package relations components provider
 */
const GRID_RELATIONS_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: RELATIONS_COMPONENTS_MODULE_PROVIDERS,
    useClass: GridDynamicModuleItemsProvider,
    multi: true
};
/**
 * Enables use of grid components feature
 */
export function withGridComponents(): DynamicFeature
{
    return new DynamicFeature(
    {
        layoutRuntime:
        {
            prependProviders: [],
            providers: 
            [
                GRID_LAYOUT_COMPONENTS_PROVIDER,
            ],
        },
        layoutEditor:
        {
            prependProviders: [],
            providers: 
            [
                GRID_LAYOUT_MODULE_TYPES_PROVIDER,
                provideStaticPackageSource('grid-components'),
            ],
        },
        relationsRuntime:
        {
            prependProviders: [],
            providers: 
            [
                GRID_RELATIONS_COMPONENTS_PROVIDER,
            ],
        },
        relationsEditor:
        {
            prependProviders: [],
            providers: 
            [
                GRID_RELATIONS_MODULE_TYPES_PROVIDER,
                GRID_RELATIONS_NODES_PROVIDER,
                provideStaticPackageSource('grid-components'),
            ],
        },
    });
}