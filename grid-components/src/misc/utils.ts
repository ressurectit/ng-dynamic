import {Provider} from '@angular/core';
import {provideStaticPackageSource} from '@anglr/dynamic';

import {GRID_LAYOUT_COMPONENTS_PROVIDER, GRID_LAYOUT_MODULE_TYPES_PROVIDER, GRID_RELATIONS_COMPONENTS_PROVIDER, GRID_RELATIONS_MODULE_TYPES_PROVIDER, GRID_RELATIONS_NODES_PROVIDER} from './providers';

/**
 * Providers for layout grid subpackage
 */
export function provideGridLayout(): Provider[]
{
    return [
        GRID_LAYOUT_COMPONENTS_PROVIDER,
    ];
}

/**
 * Providers for relations grid subpackage
 */
export function provideGridRelations(): Provider[]
{
    return [
        GRID_RELATIONS_COMPONENTS_PROVIDER,
    ];
}

/**
 * Providers for layout editor grid subpackage
 */
export function provideGridLayoutEditor(): Provider[]
{
    return [
        GRID_LAYOUT_COMPONENTS_PROVIDER,
        GRID_LAYOUT_MODULE_TYPES_PROVIDER,
        provideStaticPackageSource('grid-components'),
    ];
}

/**
 * Providers for relations editor grid subpackage
 */
export function provideGridRelationsEditor(): Provider[]
{
    return [
        GRID_RELATIONS_MODULE_TYPES_PROVIDER,
        GRID_RELATIONS_NODES_PROVIDER,
        provideStaticPackageSource('grid-components'),
    ];
}

/**
 * Providers for layout relations editor grid subpackage
 */
export function provideGridLayoutRelationsEditor(): Provider[]
{
    return [
        ...provideGridRelationsEditor(),
        ...provideGridLayout(),
    ];
}


/**
 * Providers for layout relations grid subpackage
 */
export function provideGridLayoutRelations(): Provider[]
{
    return [
        ...provideGridLayout(),
        ...provideGridRelations(),
    ];
}