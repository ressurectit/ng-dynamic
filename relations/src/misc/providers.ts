import {FactoryProvider, inject, Optional} from '@angular/core';
import {DynamicItemLoader, DynamicModuleDataExtractor} from '@anglr/dynamic';
import {LOGGER, Logger} from '@anglr/common';

import {RELATIONS_COMPONENTS_LOADER, RELATIONS_COMPONENTS_MODULE_DATA_EXTRACTORS, RELATIONS_COMPONENTS_MODULE_PROVIDERS} from './tokens';
import {relationsExportExtractor} from './extractors';
import {isRelationsComponentDef} from './utils';

/**
 * Provider for default relations components extractor
 */
export const DEFAULT_RELATIONS_COMPONENTS_EXTRACTOR: FactoryProvider =
{
    provide: RELATIONS_COMPONENTS_MODULE_DATA_EXTRACTORS,
    useFactory: (logger?: Logger) =>
    {
        return new DynamicModuleDataExtractor([
                                                  relationsExportExtractor,
                                              ],
                                              logger);
    },
    deps: [[new Optional(), LOGGER]],
    multi: true
};

/**
 * Provider for relations components loader
 */
export const RELATIONS_COMPONENTS_LOADER_PROVIDER: FactoryProvider =
{
    provide: RELATIONS_COMPONENTS_LOADER,
    useFactory: () => new DynamicItemLoader(inject(RELATIONS_COMPONENTS_MODULE_PROVIDERS),
                                            inject(RELATIONS_COMPONENTS_MODULE_DATA_EXTRACTORS),
                                            isRelationsComponentDef,
                                            inject(LOGGER, {optional: true}) ?? undefined)
};