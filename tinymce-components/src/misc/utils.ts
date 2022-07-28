import {Provider} from '@angular/core';

import {TINY_MCE_LAYOUT_COMPONENTS_PROVIDER, TINY_MCE_LAYOUT_MODULE_TYPES_PROVIDER, TINY_MCE_RELATIONS_COMPONENTS_PROVIDER, TINY_MCE_RELATIONS_MODULE_TYPES_PROVIDER, TINY_MCE_RELATIONS_NODES_PROVIDER} from './providers';

/**
 * Providers for layout tiny MCE subpackage
 */
export function provideTinyMceLayout(): Provider[]
{
    return [
        TINY_MCE_LAYOUT_COMPONENTS_PROVIDER,
    ];
}

/**
 * Providers for relations tiny MCE subpackage
 */
export function provideTinyMceRelations(): Provider[]
{
    return [
        TINY_MCE_RELATIONS_COMPONENTS_PROVIDER,
    ];
}

/**
 * Providers for layout editor tiny MCE subpackage
 */
export function provideTinyMceLayoutEditor(): Provider[]
{
    return [
        TINY_MCE_LAYOUT_COMPONENTS_PROVIDER,
        TINY_MCE_LAYOUT_MODULE_TYPES_PROVIDER,
    ];
}

/**
 * Providers for relations editor tiny MCE subpackage
 */
export function provideTinyMceRelationsEditor(): Provider[]
{
    return [
        TINY_MCE_RELATIONS_MODULE_TYPES_PROVIDER,
        TINY_MCE_RELATIONS_NODES_PROVIDER,
    ];
}

/**
 * Providers for layout relations editor tiny MCE subpackage
 */
export function provideTinyMceLayoutRelationsEditor(): Provider[]
{
    return [
        ...provideTinyMceRelationsEditor(),
        ...provideTinyMceLayout(),
    ];
}