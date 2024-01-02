import {ClassProvider} from '@angular/core';
import {DynamicFeature, provideStaticPackageSource} from '@anglr/dynamic';
import {LAYOUT_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/layout';
import {LAYOUT_MODULE_TYPES_PROVIDERS} from '@anglr/dynamic/layout-editor';
import {RELATIONS_MODULE_TYPES_PROVIDERS, RELATIONS_NODES_PROVIDERS} from '@anglr/dynamic/relations-editor';
import {RELATIONS_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/relations';

import {HandlebarsDynamicModuleItemsProvider, HandlebarsDynamicModuleRelationsProvider, HandlebarsDynamicModuleTypesProvider} from '../services';

/**
 * Provider for handlebars package layout components provider
 */
const HANDLEBARS_LAYOUT_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_PROVIDERS,
    useClass: HandlebarsDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for handlebars dynamic layout module types provider
 */
const HANDLEBARS_LAYOUT_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: LAYOUT_MODULE_TYPES_PROVIDERS,
    useClass: HandlebarsDynamicModuleTypesProvider,
    multi: true
};

/**
 * Provider for handlebars dynamic relations types provider
 */
const HANDLEBARS_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: HandlebarsDynamicModuleRelationsProvider,
    multi: true
};

/**
 * Provider for handlebars package relations nodes provider
 */
const HANDLEBARS_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: HandlebarsDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for handlebars package relations components provider
 */
const HANDLEBARS_RELATIONS_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: RELATIONS_COMPONENTS_MODULE_PROVIDERS,
    useClass: HandlebarsDynamicModuleItemsProvider,
    multi: true
};

/**
 * Enables use of handlebars components feature
 */
export function withHandlebarsComponents(): DynamicFeature
{
    return new DynamicFeature(
    {
        layoutRuntime:
        {
            prependProviders: [],
            providers: 
            [
                HANDLEBARS_LAYOUT_COMPONENTS_PROVIDER,
            ],
        },
        layoutEditor:
        {
            prependProviders: [],
            providers: 
            [
                HANDLEBARS_LAYOUT_MODULE_TYPES_PROVIDER,
                provideStaticPackageSource('handlebars-components'),
            ],
        },
        relationsRuntime:
        {
            prependProviders: [],
            providers: 
            [
                HANDLEBARS_RELATIONS_COMPONENTS_PROVIDER,
            ],
        },
        relationsEditor:
        {
            prependProviders: [],
            providers: 
            [
                HANDLEBARS_RELATIONS_MODULE_TYPES_PROVIDER,
                HANDLEBARS_RELATIONS_NODES_PROVIDER,
                provideStaticPackageSource('handlebars-components'),
            ],
        },
    });
}