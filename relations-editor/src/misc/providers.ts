import {ClassProvider, ExistingProvider, FactoryProvider, inject} from '@angular/core';
import {defaultExportExtractor, DynamicItemLoader, DynamicModuleDataExtractor, MetadataHistoryManager, EDITOR_METADATA_MANAGER} from '@anglr/dynamic';
import {LOGGER} from '@anglr/common';

import {RELATIONS_HISTORY_MANAGER, RELATIONS_MODULE_TYPES_DATA_EXTRACTORS, RELATIONS_MODULE_TYPES_LOADER, RELATIONS_MODULE_TYPES_PROVIDERS, RELATIONS_NODES_DATA_EXTRACTORS, RELATIONS_NODES_LOADER, RELATIONS_NODES_PROVIDERS} from './tokens';
import {componentRelationsNodeExtractor, relationsNodeExtractor} from './extractors';
import {StaticComponentsRelationsNodesProvider, StaticComponentsRelationsTypesProvider, RelationsNodeManager} from '../services';
import {isRelationsModuleTypes, isRelationsNodeDef} from './utils';

/**
 * Provider for static components relations nodes provider
 */
export const STATIC_COMPONENTS_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: StaticComponentsRelationsNodesProvider,
    multi: true
};

/**
 * Provider for static components relations types provider
 */
export const STATIC_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: StaticComponentsRelationsTypesProvider,
    multi: true
};

/**
 * Provider for default relations nodes extractor
 */
export const DEFAULT_RELATIONS_NODES_EXTRACTOR: FactoryProvider =
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
export const COMPONENTS_RELATIONS_NODES_EXTRACTOR: FactoryProvider =
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
export const DEFAULT_RELATIONS_MODULE_TYPES_EXTRACTOR: FactoryProvider =
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
export const RELATIONS_MODULE_TYPES_LOADER_PROVIDER: FactoryProvider =
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
export const RELATIONS_NODES_LOADER_PROVIDER: FactoryProvider =
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
export const RELATIONS_HISTORY_MANAGER_STATE: ExistingProvider =
{
    provide: EDITOR_METADATA_MANAGER,
    useExisting: RelationsNodeManager,
};

/**
 * Provider for relations history manager
 */
export const RELATIONS_HISTORY_MANAGER_PROVIDER: ClassProvider =
{
    provide: RELATIONS_HISTORY_MANAGER,
    useClass: MetadataHistoryManager
};
