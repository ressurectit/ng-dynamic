import {Provider} from '@angular/core';
import {provideStaticPackageSource} from '@anglr/dynamic';

import {BASIC_LAYOUT_COMPONENTS_PROVIDER, BASIC_LAYOUT_MODULE_TYPES_PROVIDER, BASIC_RELATIONS_COMPONENTS_PROVIDER, BASIC_RELATIONS_MODULE_TYPES_PROVIDER, BASIC_RELATIONS_NODES_PROVIDER} from './providers';

/**
 * Providers for layout basic subpackage
 */
export function provideBasicLayout(): Provider[]
{
    return [
        BASIC_LAYOUT_COMPONENTS_PROVIDER,
    ];
}

/**
 * Providers for relations basic subpackage
 */
export function provideBasicRelations(): Provider[]
{
    return [
        BASIC_RELATIONS_COMPONENTS_PROVIDER,
    ];
}

/**
 * Providers for layout editor basic subpackage
 */
export function provideBasicLayoutEditor(): Provider[]
{
    return [
        BASIC_LAYOUT_COMPONENTS_PROVIDER,
        BASIC_LAYOUT_MODULE_TYPES_PROVIDER,
        provideStaticPackageSource('basic-components'),
    ];
}

/**
 * Providers for relations editor basic subpackage
 */
export function provideBasicRelationsEditor(): Provider[]
{
    return [
        BASIC_RELATIONS_MODULE_TYPES_PROVIDER,
        BASIC_RELATIONS_NODES_PROVIDER,
        provideStaticPackageSource('basic-components'),
    ];
}

/**
 * Providers for layout relations editor basic subpackage
 */
export function provideBasicLayoutRelationsEditor(): Provider[]
{
    return [
        ...provideBasicRelationsEditor(),
        ...provideBasicLayout(),
    ];
}


/**
 * Providers for layout relations basic subpackage
 */
export function provideBasicLayoutRelations(): Provider[]
{
    return [
        ...provideBasicLayout(),
        ...provideBasicRelations(),
    ];
}