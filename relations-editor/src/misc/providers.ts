import {ClassProvider, FactoryProvider, Optional} from '@angular/core';
import {BasicComponentsDynamicModuleItemsProvider, DynamicModuleDataExtractor} from '@anglr/dynamic';
import {LOGGER, Logger} from '@anglr/common';

import {RELATIONS_NODES_DATA_EXTRACTORS, RELATIONS_NODES_PROVIDERS} from './tokens';
import {relationsNodeExtractor} from './extractors';

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