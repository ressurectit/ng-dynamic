import {Provider} from '@angular/core';
import {provideStaticPackageSource} from '@anglr/dynamic';

import {MATH_LAYOUT_COMPONENTS_PROVIDER, MATH_LAYOUT_MODULE_TYPES_PROVIDER, MATH_RELATIONS_COMPONENTS_PROVIDER, MATH_RELATIONS_MODULE_TYPES_PROVIDER, MATH_RELATIONS_NODES_PROVIDER} from './providers';

//TODO: remove math layout

/**
 * Providers for layout math subpackage
 */
export function provideMathLayout(): Provider[]
{
    return [
        MATH_LAYOUT_COMPONENTS_PROVIDER,
    ];
}

/**
 * Providers for relations math subpackage
 */
export function provideMathRelations(): Provider[]
{
    return [
        MATH_RELATIONS_COMPONENTS_PROVIDER,
    ];
}

/**
 * Providers for layout editor math subpackage
 */
export function provideMathLayoutEditor(): Provider[]
{
    return [
        MATH_LAYOUT_COMPONENTS_PROVIDER,
        MATH_LAYOUT_MODULE_TYPES_PROVIDER,
        provideStaticPackageSource('math-components'),
    ];
}

/**
 * Providers for relations editor math subpackage
 */
export function provideMathRelationsEditor(): Provider[]
{
    return [
        MATH_RELATIONS_MODULE_TYPES_PROVIDER,
        MATH_RELATIONS_NODES_PROVIDER,
        provideStaticPackageSource('math-components'),
    ];
}

/**
 * Providers for layout relations editor math subpackage
 */
export function provideMathLayoutRelationsEditor(): Provider[]
{
    return [
        ...provideMathRelationsEditor(),
        ...provideMathLayout(),
    ];
}


/**
 * Providers for layout relations math subpackage
 */
export function provideMathLayoutRelations(): Provider[]
{
    return [
        ...provideMathLayout(),
        ...provideMathRelations(),
    ];
}