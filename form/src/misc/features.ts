import {ClassProvider} from '@angular/core';
import {DynamicFeature, provideStaticPackageSource} from '@anglr/dynamic';
import {LAYOUT_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/layout';
import {LAYOUT_MODULE_TYPES_PROVIDERS} from '@anglr/dynamic/layout-editor';
import {RELATIONS_MODULE_TYPES_PROVIDERS, RELATIONS_NODES_PROVIDERS} from '@anglr/dynamic/relations-editor';
import {RELATIONS_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/relations';

import {FormDynamicModuleItemsProvider, FormDynamicModuleRelationsProvider, FormDynamicModuleTypesProvider} from '../services';

/**
 * Provider for form components providers
 */
const FORM_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_PROVIDERS,
    useClass: FormDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for form dynamic layout module types provider
 */
const FORM_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: LAYOUT_MODULE_TYPES_PROVIDERS,
    useClass: FormDynamicModuleTypesProvider,
    multi: true
};

/**
 * Provider for form dynamic relations types provider
 */
const FORM_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: FormDynamicModuleRelationsProvider,
    multi: true
};

/**
 * Provider for form package relations nodes provider
 */
const FORM_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: FormDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for form package relations components provider
 */
const FORM_RELATIONS_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: RELATIONS_COMPONENTS_MODULE_PROVIDERS,
    useClass: FormDynamicModuleItemsProvider,
    multi: true
};

/**
 * Enables use of form components feature
 */
export function withFormComponents(): DynamicFeature
{
    return new DynamicFeature(
    {
        layoutRuntime:
        {
            prependProviders: [],
            providers: 
            [
                FORM_COMPONENTS_PROVIDER,
            ],
        },
        layoutEditor:
        {
            prependProviders: [],
            providers: 
            [
                FORM_MODULE_TYPES_PROVIDER,
                provideStaticPackageSource('form-components'),
            ],
        },
        relationsRuntime:
        {
            prependProviders: [],
            providers: 
            [
                FORM_RELATIONS_COMPONENTS_PROVIDER,
            ],
        },
        relationsEditor:
        {
            prependProviders: [],
            providers: 
            [
                FORM_RELATIONS_MODULE_TYPES_PROVIDER,
                FORM_RELATIONS_NODES_PROVIDER,
                provideStaticPackageSource('form-components'),
            ],
        },
    });
}