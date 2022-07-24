import {ClassProvider, FactoryProvider, inject, Optional} from '@angular/core';
import {BasicComponentsDynamicModuleItemsProvider, defaultExportExtractor, DynamicItemLoader, DynamicModuleDataExtractor} from '@anglr/dynamic';
import {LOGGER, Logger} from '@anglr/common';

import {RELATIONS_MODULE_TYPES_DATA_EXTRACTORS, RELATIONS_MODULE_TYPES_LOADER, RELATIONS_MODULE_TYPES_PROVIDERS, RELATIONS_NODES_DATA_EXTRACTORS, RELATIONS_NODES_LOADER, RELATIONS_NODES_PROVIDERS} from './tokens';
import {componentRelationsNodeExtractor, relationsNodeExtractor} from './extractors';
import {LayoutComponentsRelationsNodesProvider, LayoutComponentsRelationsTypesProvider, StaticComponentsRelationsNodesProvider, StaticComponentsRelationsTypesProvider, DefaultDynamicModuleRelationsProvider} from '../services';
import {isRelationsModuleTypes, isRelationsNodeDef} from './utils';

/**
 * Provider for basic components package relations nodes provider
 */
export const BASIC_COMPONENTS_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: BasicComponentsDynamicModuleItemsProvider,
    multi: true
};

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
 * Provider for layout components relations nodes provider
 */
export const LAYOUT_COMPONENTS_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: LayoutComponentsRelationsNodesProvider,
    multi: true
};

/**
 * Provider for default dynamic relations types provider for all built-in types in dynamic
 */
export const DYNAMIC_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: DefaultDynamicModuleRelationsProvider,
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
 * Provider for layout components relations types provider
 */
export const LAYOUT_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: LayoutComponentsRelationsTypesProvider,
    multi: true
};

/**
 * Provider for default relations nodes extractor
 */
export const DEFAULT_RELATIONS_NODES_EXTRACTOR: FactoryProvider =
{
    provide: RELATIONS_NODES_DATA_EXTRACTORS,
    useFactory: (logger?: Logger) =>
    {
        return new DynamicModuleDataExtractor([
                                                  relationsNodeExtractor,
                                              ],
                                              logger);
    },
    deps: [[new Optional(), LOGGER]],
    multi: true
};

/**
 * Provider for static and layout components relations nodes extractor
 */
export const COMPONENTS_RELATIONS_NODES_EXTRACTOR: FactoryProvider =
{
    provide: RELATIONS_NODES_DATA_EXTRACTORS,
    useFactory: (logger?: Logger) =>
    {
        return new DynamicModuleDataExtractor([
                                                  componentRelationsNodeExtractor,
                                              ],
                                              logger);
    },
    deps: [[new Optional(), LOGGER]],
    multi: true
};

/**
 * Provider for default relations module types extractor
 */
export const DEFAULT_RELATIONS_MODULE_TYPES_EXTRACTOR: FactoryProvider =
{
    provide: RELATIONS_MODULE_TYPES_DATA_EXTRACTORS,
    useFactory: (logger?: Logger) =>
    {
        return new DynamicModuleDataExtractor([
                                                  defaultExportExtractor,
                                              ],
                                              logger);
    },
    deps: [[new Optional(), LOGGER]],
    multi: true
};

/**
 * Provider for relations module types
 */
export const RELATIONS_MODULE_TYPES_LOADER_PROVIDER: FactoryProvider =
{
    provide: RELATIONS_MODULE_TYPES_LOADER,
    useFactory: () => new DynamicItemLoader(inject(RELATIONS_MODULE_TYPES_PROVIDERS),
                                            inject(RELATIONS_MODULE_TYPES_DATA_EXTRACTORS),
                                            isRelationsModuleTypes,
                                            inject(LOGGER, {optional: true}) ?? undefined)
};

/**
 * Provider for relations node loader
 */
export const RELATIONS_NODES_LOADER_PROVIDER: FactoryProvider =
{
    provide: RELATIONS_NODES_LOADER,
    useFactory: () => new DynamicItemLoader(inject(RELATIONS_NODES_PROVIDERS),
                                            inject(RELATIONS_NODES_DATA_EXTRACTORS),
                                            isRelationsNodeDef,
                                            inject(LOGGER, {optional: true}) ?? undefined)
};