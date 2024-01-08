import {ClassProvider, ExistingProvider, FactoryProvider, Provider, Type, inject} from '@angular/core';
import {CoreDynamicFeature, DynamicFeatureType, defaultExportExtractor, DynamicItemLoader, DynamicModuleDataExtractor, MetadataHistoryManager, EDITOR_METADATA_MANAGER, DynamicFeature, provideStaticPackageSource, FactoryFn} from '@anglr/dynamic';
import {LOGGER} from '@anglr/common';

import {RELATIONS_HISTORY_MANAGER, RELATIONS_MODULE_TYPES_DATA_EXTRACTORS, RELATIONS_MODULE_TYPES_LOADER, RELATIONS_MODULE_TYPES_PROVIDERS, RELATIONS_NODES_DATA_EXTRACTORS, RELATIONS_NODES_LOADER, RELATIONS_NODES_PROVIDERS} from './tokens';
import {componentRelationsNodeExtractor, relationsNodeExtractor} from './extractors';
import {StaticComponentsRelationsNodesProvider, StaticComponentsRelationsTypesProvider, RelationsNodeManager, ScopeRegister, StaticComponentsRegister} from '../services';
import {isRelationsModuleTypes, isRelationsNodeDef} from './utils';

/**
 * Provider for static components relations nodes provider
 */
const STATIC_COMPONENTS_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: StaticComponentsRelationsNodesProvider,
    multi: true
};

/**
 * Provider for static components relations types provider
 */
const STATIC_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: StaticComponentsRelationsTypesProvider,
    multi: true
};

/**
 * Provider for default relations nodes extractor
 */
const DEFAULT_RELATIONS_NODES_EXTRACTOR: FactoryProvider =
{
    provide: RELATIONS_NODES_DATA_EXTRACTORS,
    useFactory: () =>
    {
        return new DynamicModuleDataExtractor([
                                                  relationsNodeExtractor,
                                              ],
                                              inject(LOGGER));
    },
    multi: true
};

/**
 * Provider for static and layout components relations nodes extractor
 */
const COMPONENTS_RELATIONS_NODES_EXTRACTOR: FactoryProvider =
{
    provide: RELATIONS_NODES_DATA_EXTRACTORS,
    useFactory: () =>
    {
        return new DynamicModuleDataExtractor([
                                                  componentRelationsNodeExtractor,
                                              ],
                                              inject(LOGGER));
    },
    multi: true
};

/**
 * Provider for default relations module types extractor
 */
const DEFAULT_RELATIONS_MODULE_TYPES_EXTRACTOR: FactoryProvider =
{
    provide: RELATIONS_MODULE_TYPES_DATA_EXTRACTORS,
    useFactory: () =>
    {
        return new DynamicModuleDataExtractor([
                                                  defaultExportExtractor,
                                              ],
                                              inject(LOGGER));
    },
    multi: true
};

/**
 * Provider for relations module types
 */
const RELATIONS_MODULE_TYPES_LOADER_PROVIDER: FactoryProvider =
{
    provide: RELATIONS_MODULE_TYPES_LOADER,
    useFactory: () => new DynamicItemLoader(inject(RELATIONS_MODULE_TYPES_PROVIDERS, {optional: true}) ?? [],
                                            inject(RELATIONS_MODULE_TYPES_DATA_EXTRACTORS),
                                            isRelationsModuleTypes,
                                            inject(LOGGER),
                                            true)
};

/**
 * Provider for relations node loader
 */
const RELATIONS_NODES_LOADER_PROVIDER: FactoryProvider =
{
    provide: RELATIONS_NODES_LOADER,
    useFactory: () => new DynamicItemLoader(inject(RELATIONS_NODES_PROVIDERS, {optional: true}) ?? [],
                                            inject(RELATIONS_NODES_DATA_EXTRACTORS),
                                            isRelationsNodeDef,
                                            inject(LOGGER))
};

//TODO: rename it correctly
/**
 * Provider for relations history manager state
 */
const RELATIONS_HISTORY_MANAGER_STATE: ExistingProvider =
{
    provide: EDITOR_METADATA_MANAGER,
    useExisting: RelationsNodeManager,
};

/**
 * Provider for relations history manager
 */
const RELATIONS_HISTORY_MANAGER_PROVIDER: ClassProvider =
{
    provide: RELATIONS_HISTORY_MANAGER,
    useClass: MetadataHistoryManager
};

/**
 * Enables use of relations editor core feature
 */
export function withRelationsEditor(): CoreDynamicFeature
{
    return new CoreDynamicFeature(DynamicFeatureType.RelationsEditor,
                                  {
                                      prependProviders: [],
                                      providers:
                                      [
                                          DEFAULT_RELATIONS_NODES_EXTRACTOR,
                                          COMPONENTS_RELATIONS_NODES_EXTRACTOR,
                                          DEFAULT_RELATIONS_MODULE_TYPES_EXTRACTOR,
                                          RELATIONS_MODULE_TYPES_LOADER_PROVIDER,
                                          RELATIONS_NODES_LOADER_PROVIDER,
                                          RelationsNodeManager,
                                          ScopeRegister,
                                          RELATIONS_HISTORY_MANAGER_STATE,
                                          RELATIONS_HISTORY_MANAGER_PROVIDER,
                                      ]
                                  });
}

/**
 * Enables use of static components withing relations editor
 * @param staticRegister - Type that represents implementation of static components register
 * 
 * Works with:
 * - **relations editor**
 */
export function withStaticComponents(staticRegister: Type<StaticComponentsRegister>|FactoryFn<StaticComponentsRegister>): DynamicFeature
{
    const provider: Provider = staticRegister instanceof FactoryFn 
        ? <FactoryProvider>
        {
            provide: StaticComponentsRegister,
            useFactory: staticRegister.factoryFn,
        }
        : <ClassProvider>
        {
            provide: StaticComponentsRegister,
            useClass: staticRegister,
        };

    return new DynamicFeature(
    {
        relationsEditor:
        {
            prependProviders: [],
            providers:
            [
                STATIC_COMPONENTS_RELATIONS_NODES_PROVIDER,
                STATIC_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER,
                provider,
                provideStaticPackageSource('static-components'),
            ]
        }
    });
}
