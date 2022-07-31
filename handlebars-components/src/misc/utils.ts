import {Provider} from '@angular/core';
import {provideStaticPackageSource} from '@anglr/dynamic';

import {HANDLEBARS_LAYOUT_COMPONENTS_PROVIDER, HANDLEBARS_LAYOUT_MODULE_TYPES_PROVIDER, HANDLEBARS_RELATIONS_COMPONENTS_PROVIDER, HANDLEBARS_RELATIONS_MODULE_TYPES_PROVIDER, HANDLEBARS_RELATIONS_NODES_PROVIDER} from './providers';

/**
 * Providers for layout handlebars subpackage
 */
export function provideHandlebarsLayout(): Provider[]
{
    return [
        HANDLEBARS_LAYOUT_COMPONENTS_PROVIDER,
    ];
}

/**
 * Providers for relations handlebars subpackage
 */
export function provideHandlebarsRelations(): Provider[]
{
    return [
        HANDLEBARS_RELATIONS_COMPONENTS_PROVIDER,
    ];
}

/**
 * Providers for layout editor handlebars subpackage
 */
export function provideHandlebarsLayoutEditor(): Provider[]
{
    return [
        HANDLEBARS_LAYOUT_COMPONENTS_PROVIDER,
        HANDLEBARS_LAYOUT_MODULE_TYPES_PROVIDER,
        provideStaticPackageSource('handlebars-components'),
    ];
}

/**
 * Providers for relations editor handlebars subpackage
 */
export function provideHandlebarsRelationsEditor(): Provider[]
{
    return [
        HANDLEBARS_RELATIONS_MODULE_TYPES_PROVIDER,
        HANDLEBARS_RELATIONS_NODES_PROVIDER,
        provideStaticPackageSource('handlebars-components'),
    ];
}

/**
 * Providers for layout relations editor handlebars subpackage
 */
export function provideHandlebarsLayoutRelationsEditor(): Provider[]
{
    return [
        ...provideHandlebarsRelationsEditor(),
        ...provideHandlebarsLayout(),
    ];
}

/**
 * Providers for layout relations handlebars subpackage
 */
export function provideHandlebarsLayoutRelations(): Provider[]
{
    return [
        ...provideHandlebarsLayout(),
        ...provideHandlebarsRelations(),
    ];
}