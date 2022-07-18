import {ClassProvider, FactoryProvider, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {BasicComponentsDynamicModuleItemsProvider, defaultExportExtractor, DynamicModuleDataExtractor, extensionsExportsExtractor, MaterialComponentsDynamicModuleItemsProvider} from '@anglr/dynamic';

import {LAYOUT_COMPONENTS_MODULE_DATA_EXTRACTORS, LAYOUT_COMPONENTS_MODULE_PROVIDERS} from './tokens';

/**
 * Provider for basic components package layout components provider
 */
export const BASIC_COMPONENTS_LAYOUT_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_PROVIDERS,
    useClass: BasicComponentsDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for material components package layout components provider
 */
 export const MATERIAL_COMPONENTS_LAYOUT_COMPONENTS_PROVIDER: ClassProvider =
 {
     provide: LAYOUT_COMPONENTS_MODULE_PROVIDERS,
     useClass: MaterialComponentsDynamicModuleItemsProvider,
     multi: true
 };

/**
 * Provider for default layout components extractor
 */
export const DEFAULT_LAYOUT_COMPONENTS_EXTRACTOR: FactoryProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_DATA_EXTRACTORS,
    useFactory: (logger?: Logger) =>
    {
        return new DynamicModuleDataExtractor([
                                                  defaultExportExtractor,
                                                  extensionsExportsExtractor,
                                              ],
                                              logger);
    },
    deps: [[new Optional(), LOGGER]],
    multi: true
};