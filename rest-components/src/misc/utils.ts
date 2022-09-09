import {Provider} from '@angular/core';
import {provideStaticPackageSource} from '@anglr/dynamic';

import {REST_RELATIONS_COMPONENTS_PROVIDER, REST_RELATIONS_MODULE_TYPES_PROVIDER, REST_RELATIONS_NODES_PROVIDER} from './providers';

/**
 * Providers for relations rest subpackage
 */
export function provideRestRelations(): Provider[]
{
    return [
        REST_RELATIONS_COMPONENTS_PROVIDER,
    ];
}

/**
 * Providers for relations editor rest subpackage
 */
export function provideRestRelationsEditor(): Provider[]
{
    return [
        REST_RELATIONS_MODULE_TYPES_PROVIDER,
        REST_RELATIONS_NODES_PROVIDER,
        provideStaticPackageSource('rest-components'),
    ];
}

/**
 * Providers for layout relations editor rest subpackage
 */
export function provideRestLayoutRelationsEditor(): Provider[]
{
    return [
        ...provideRestRelationsEditor(),
    ];
}

/**
 * Providers for layout relations rest subpackage
 */
export function provideRestLayoutRelations(): Provider[]
{
    return [
        ...provideRestRelations(),
    ];
}