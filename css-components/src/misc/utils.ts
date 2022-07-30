import {Provider} from '@angular/core';

import {CSS_LAYOUT_COMPONENTS_PROVIDER, CSS_LAYOUT_MODULE_TYPES_PROVIDER} from './providers';

/**
 * Providers for layout css subpackage
 */
export function provideCssLayout(): Provider[]
{
    return [
        CSS_LAYOUT_COMPONENTS_PROVIDER,
    ];
}

/**
 * Providers for layout editor css subpackage
 */
export function provideCssLayoutEditor(): Provider[]
{
    return [
        CSS_LAYOUT_COMPONENTS_PROVIDER,
        CSS_LAYOUT_MODULE_TYPES_PROVIDER,
    ];
}

/**
 * Providers for layout relations editor css subpackage
 */
export function provideCssLayoutRelationsEditor(): Provider[]
{
    return [
        ...provideCssLayout(),
    ];
}

/**
 * Providers for layout relations css subpackage
 */
export function provideCssLayoutRelations(): Provider[]
{
    return [
        ...provideCssLayout(),
    ];
}