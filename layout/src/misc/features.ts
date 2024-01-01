import {FactoryProvider, inject} from '@angular/core';
import {LOGGER} from '@anglr/common';
import {CoreDynamicFeature, defaultExportExtractor, DynamicFeatureType, DynamicItemLoader, DynamicModuleDataExtractor, extensionsExportsExtractor} from '@anglr/dynamic';

import {LAYOUT_COMPONENTS_LOADER, LAYOUT_COMPONENTS_MODULE_DATA_EXTRACTORS, LAYOUT_COMPONENTS_MODULE_PROVIDERS} from './tokens';
import {isLayoutComponentDef} from './utils';
import {LayoutRenderer} from '../services';

/**
 * Provider for default layout components extractor
 */
const DEFAULT_LAYOUT_COMPONENTS_EXTRACTOR: FactoryProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_DATA_EXTRACTORS,
    useFactory: () =>
    {
        return new DynamicModuleDataExtractor([
                                                  defaultExportExtractor,
                                                  extensionsExportsExtractor,
                                              ],
                                              inject(LOGGER));
    },
    multi: true
};

/**
 * Provider for layout components loader
 */
const LAYOUT_COMPONENTS_LOADER_PROVIDER: FactoryProvider =
{
    provide: LAYOUT_COMPONENTS_LOADER,
    useFactory: () =>
    {
        return new DynamicItemLoader(inject(LAYOUT_COMPONENTS_MODULE_PROVIDERS),
                                     inject(LAYOUT_COMPONENTS_MODULE_DATA_EXTRACTORS),
                                     isLayoutComponentDef,
                                     inject(LOGGER));
    }
};

/**
 * Enables use of layout runtime core feature
 */
export function withLayoutRuntime(): CoreDynamicFeature
{
    return new CoreDynamicFeature(DynamicFeatureType.LayoutRuntime,
                                  {
                                      prependProviders: [],
                                      providers: 
                                      [
                                          LAYOUT_COMPONENTS_LOADER_PROVIDER,
                                          DEFAULT_LAYOUT_COMPONENTS_EXTRACTOR,
                                          LayoutRenderer,
                                      ]
                                  });
}