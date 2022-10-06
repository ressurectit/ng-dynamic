import {Provider} from '@angular/core';
import {provideStaticPackageSource} from '@anglr/dynamic';

import {MATERIAL_LAYOUT_COMPONENTS_PROVIDER, MATERIAL_LAYOUT_MODULE_TYPES_PROVIDER, MATERIAL_RELATIONS_COMPONENTS_PROVIDER, MATERIAL_RELATIONS_MODULE_TYPES_PROVIDER, MATERIAL_RELATIONS_NODES_PROVIDER} from './providers';

/**
 * Providers for layout material subpackage
 */
export function provideMaterialLayout(): Provider[]
{
    return [
        MATERIAL_LAYOUT_COMPONENTS_PROVIDER,
    ];
}

/**
 * Providers for relations material subpackage
 */
export function provideMaterialRelations(): Provider[]
{
    return [
        MATERIAL_RELATIONS_COMPONENTS_PROVIDER,
    ];
}

/**
 * Providers for layout editor material subpackage
 */
export function provideMaterialLayoutEditor(): Provider[]
{
    return [
        MATERIAL_LAYOUT_COMPONENTS_PROVIDER,
        MATERIAL_LAYOUT_MODULE_TYPES_PROVIDER,
        provideStaticPackageSource('material-components'),
    ];
}

/**
 * Providers for relations editor material subpackage
 */
export function provideMaterialRelationsEditor(): Provider[]
{
    return [
        MATERIAL_RELATIONS_MODULE_TYPES_PROVIDER,
        MATERIAL_RELATIONS_NODES_PROVIDER,
        provideStaticPackageSource('material-components'),
    ];
}

/**
 * Providers for layout relations editor material subpackage
 */
export function provideMaterialLayoutRelationsEditor(): Provider[]
{
    return [
        ...provideMaterialRelationsEditor(),
        ...provideMaterialLayout(),
    ];
}


/**
 * Providers for layout relations material subpackage
 */
export function provideMaterialLayoutRelations(): Provider[]
{
    return [
        ...provideMaterialLayout(),
        ...provideMaterialRelations(),
    ];
}