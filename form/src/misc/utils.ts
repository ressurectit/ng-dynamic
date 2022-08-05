import {Provider} from '@angular/core';
import {provideStaticPackageSource} from '@anglr/dynamic';

import {FORM_COMPONENTS_PROVIDER, FORM_MODULE_TYPES_PROVIDER} from './providers';

/**
 * Providers for layout form subpackage
 */
export function provideFormLayout(): Provider[]
{
    return [
        FORM_COMPONENTS_PROVIDER,
    ];
}

/**
 * Default providers for form subpackage
 */
export function provideFormLayoutEditor(): Provider[]
{
    return [
        FORM_COMPONENTS_PROVIDER,
        FORM_MODULE_TYPES_PROVIDER,
        provideStaticPackageSource('form-components'),
    ];
}