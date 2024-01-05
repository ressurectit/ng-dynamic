import {ClassProvider, FactoryProvider, Type} from '@angular/core';
import {CoreDynamicFeature, DynamicFeature, DynamicFeatureType, provideStaticPackageSource} from '@anglr/dynamic';
import {LAYOUT_COMPONENTS_MODULE_PROVIDERS, withLayoutRuntime} from '@anglr/dynamic/layout';
import {RELATIONS_COMPONENTS_MODULE_PROVIDERS, withRelationsRuntime} from '@anglr/dynamic/relations';
import {LAYOUT_MODULE_TYPES_PROVIDERS, LayoutComponentsIteratorService, REFRESH_PALETTE_OBSERVABLES} from '@anglr/dynamic/layout-editor';
import {RELATIONS_MODULE_TYPES_PROVIDERS, RELATIONS_NODES_PROVIDERS, ScopeRegister as RelationsScopeRegister, withRelationsEditor, REFRESH_PALETTE_OBSERVABLES as RELATIONS_REFRESH_PALETTE_OBSERVABLES} from '@anglr/dynamic/relations-editor';
import {NoopAction} from '@jscrpt/common';

import {CustomComponentsDynamicModuleItemsProvider, CustomComponentsDynamicModuleRelationsProvider, CustomComponentsDynamicModuleTypesProvider, CustomComponentsRegister, CustomRelationsDynamicModuleItemsProvider, CustomRelationsDynamicModuleRelationsProvider, CustomRelationsRegister, LayoutComponentsRegister, LayoutComponentsRelationsNodesProvider, LayoutComponentsRelationsTypesProvider, LayoutManager, ScopeRegister} from '../services';

/**
 * Provider for layout components relations nodes provider
 */
const LAYOUT_COMPONENTS_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: LayoutComponentsRelationsNodesProvider,
    multi: true
};

/**
 * Provider for layout components relations types provider
 */
const LAYOUT_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: LayoutComponentsRelationsTypesProvider,
    multi: true
};

/**
 * Provider for custom components package layout components provider
 */
const CUSTOM_COMPONENTS_LAYOUT_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_PROVIDERS,
    useClass: CustomComponentsDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for custom components dynamic layout module types provider
 */
const CUSTOM_COMPONENTS_LAYOUT_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: LAYOUT_MODULE_TYPES_PROVIDERS,
    useClass: CustomComponentsDynamicModuleTypesProvider,
    multi: true
};

/**
 * Provider for custom components dynamic relations types provider
 */
const CUSTOM_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: CustomComponentsDynamicModuleRelationsProvider,
    multi: true
};

/**
 * Provider for custom components package relations nodes provider
 */
const CUSTOM_COMPONENTS_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: CustomComponentsDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for custom relations dynamic relations types provider
 */
const CUSTOM_RELATIONS_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: CustomRelationsDynamicModuleRelationsProvider,
    multi: true
};

/**
 * Provider for custom relations package relations nodes provider
 */
const CUSTOM_RELATIONS_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: CustomRelationsDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for custom relations package relations components provider
 */
const CUSTOM_RELATIONS_RELATIONS_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: RELATIONS_COMPONENTS_MODULE_PROVIDERS,
    useClass: CustomRelationsDynamicModuleItemsProvider,
    multi: true
};

/**
 * Enables use of layout relations runtime
 */
export function withLayoutRelationsRuntime(): CoreDynamicFeature
{
    return new CoreDynamicFeature(DynamicFeatureType.None,
                                  {
                                      prependProviders: [],
                                      providers: [],
                                  },
                                  withLayoutRuntime(),
                                  withRelationsRuntime());
}

/**
 * Enables use of layout components inside of relations editor
 */
export function withLayoutRelationsEditor(): CoreDynamicFeature
{
    return new CoreDynamicFeature(DynamicFeatureType.None,
                                  {
                                      prependProviders: [],
                                      providers: 
                                      [
                                          LAYOUT_COMPONENTS_RELATIONS_NODES_PROVIDER,
                                          LAYOUT_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER,
                                          LayoutManager,
                                          LayoutComponentsRegister,
                                          LayoutComponentsIteratorService,
                                          <ClassProvider>
                                          {
                                              provide: RelationsScopeRegister,
                                              useClass: ScopeRegister,
                                          },
                                          provideStaticPackageSource('layout-components'),
                                      ],
                                  },
                                  withLayoutRuntime(),
                                  withRelationsEditor());
}

/**
 * Enables use of custom components
 * @param customComponentRegister - Type that represents implementation of custom components register
 * @param layoutRefreshPaletteObservable - Array of factory functions for layout refresh palette observables
 */
export function withCustomComponents(customComponentRegister: Type<CustomComponentsRegister> = CustomComponentsRegister,
                                     ...layoutRefreshPaletteObservable: NoopAction[]): DynamicFeature
{
    return new DynamicFeature(
    {
        layoutRuntime:
        {
            prependProviders: [],
            providers: 
            [
                CUSTOM_COMPONENTS_LAYOUT_COMPONENTS_PROVIDER,
                LayoutComponentsIteratorService,
            ],
        },
        layoutEditor:
        {
            prependProviders: [],
            providers:
            [
                CUSTOM_COMPONENTS_LAYOUT_MODULE_TYPES_PROVIDER,
                provideStaticPackageSource('custom-components'),
                <ClassProvider>
                {
                    provide: CustomComponentsRegister,
                    useClass: customComponentRegister,
                },
                ...layoutRefreshPaletteObservable.map(itm =>
                {
                    return <FactoryProvider> {
                        provide: REFRESH_PALETTE_OBSERVABLES,
                        useFactory: itm,
                        multi: true,
                    };
                }),
            ],
        },
        relationsEditor:
        {
            prependProviders: [],
            providers:
            [
                CUSTOM_COMPONENTS_RELATIONS_NODES_PROVIDER,
                CUSTOM_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER,
                CUSTOM_COMPONENTS_LAYOUT_COMPONENTS_PROVIDER,
                provideStaticPackageSource('custom-components'),
                <ClassProvider>
                {
                    provide: CustomComponentsRegister,
                    useClass: customComponentRegister,
                },
            ],
        }
    });
}

/**
 * Enables use of custom relations
 * @param customRelationsRegister - Type that represents implementation of custom relations register
 * @param relationsRefreshPaletteObservable - Array of factory functions for relations refresh palette observables
 */
export function withCustomRelations(customRelationsRegister: Type<CustomRelationsRegister> = CustomRelationsRegister,
                                    ...relationsRefreshPaletteObservable: NoopAction[]): DynamicFeature
{
    return new DynamicFeature(
    {
        relationsRuntime:
        {
            prependProviders: [],
            providers:
            [
                CUSTOM_RELATIONS_RELATIONS_COMPONENTS_PROVIDER,
            ],
        },
        relationsEditor:
        {
            prependProviders: [],
            providers:
            [
                CUSTOM_RELATIONS_RELATIONS_NODES_PROVIDER,
                CUSTOM_RELATIONS_RELATIONS_MODULE_TYPES_PROVIDER,
                provideStaticPackageSource('custom-relations'),
                <ClassProvider>
                {
                    provide: CustomRelationsRegister,
                    useClass: customRelationsRegister,
                },
                ...relationsRefreshPaletteObservable.map(itm =>
                    {
                        return <FactoryProvider> {
                            provide: RELATIONS_REFRESH_PALETTE_OBSERVABLES,
                            useFactory: itm,
                            multi: true,
                        };
                    }),
            ],
        },
    });
}