import {ClassProvider, FactoryProvider, inject, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {BasicComponentsDynamicModuleItemsProvider, defaultExportExtractor, DynamicItemLoader, DynamicModuleDataExtractor, extensionsExportsExtractor, MaterialComponentsDynamicModuleItemsProvider} from '@anglr/dynamic';

import {LAYOUT_COMPONENTS_LOADER, LAYOUT_COMPONENTS_MODULE_DATA_EXTRACTORS, LAYOUT_COMPONENTS_MODULE_PROVIDERS} from './tokens';
import {isLayoutComponentDef} from './utils';

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

/**
 * Provider for layout components loader
 */
export const LAYOUT_COMPONENTS_LOADER_PROVIDER: FactoryProvider =
{
    provide: LAYOUT_COMPONENTS_LOADER,
    useFactory: () =>
    {
        return new DynamicItemLoader(inject(LAYOUT_COMPONENTS_MODULE_PROVIDERS),
                                     inject(LAYOUT_COMPONENTS_MODULE_DATA_EXTRACTORS),
                                     isLayoutComponentDef,
                                     inject(LOGGER, {optional: true}) ?? undefined);
    }
};