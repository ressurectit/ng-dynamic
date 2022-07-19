import {ClassProvider, FactoryProvider, Optional} from '@angular/core';
import {BasicComponentsDynamicModuleItemsProvider, DynamicModuleDataExtractor} from '@anglr/dynamic';
import {LOGGER, Logger} from '@anglr/common';

import {RELATIONS_NODES_DATA_EXTRACTORS, RELATIONS_NODES_PROVIDERS} from './tokens';
import {registeredComponentRelationsNodeExtractor, relationsNodeExtractor} from './extractors';
import {RegisteredComponentsRelationsNodesProvider} from '../services';

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
 * Provider for registered components relations nodes provider
 */
export const REGISTERED_COMPONENTS_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: RegisteredComponentsRelationsNodesProvider,
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
 * Provider for registered components relations nodes extractor
 */
export const REGISTERED_COMPONENTS_RELATIONS_NODES_EXTRACTOR: FactoryProvider =
{
    provide: RELATIONS_NODES_DATA_EXTRACTORS,
    useFactory: (logger?: Logger) =>
    {
        return new DynamicModuleDataExtractor([
                                                  registeredComponentRelationsNodeExtractor,
                                              ],
                                              logger);
    },
    deps: [[new Optional(), LOGGER]],
    multi: true
};