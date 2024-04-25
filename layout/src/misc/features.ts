import {ClassProvider, FactoryProvider, Type, inject} from '@angular/core';
import {LOGGER} from '@anglr/common';
import {CoreDynamicFeature, defaultExportExtractor, DynamicFeature, DynamicFeatureType, DynamicItemLoader, DynamicModuleDataExtractor, extensionsExportsExtractor, MetadataStorage} from '@anglr/dynamic';

import {LAYOUT_COMPONENTS_LOADER, LAYOUT_COMPONENTS_MODULE_DATA_EXTRACTORS, LAYOUT_COMPONENTS_MODULE_PROVIDERS, LAYOUT_METADATA_STORAGE} from './tokens';
import {isLayoutComponentDef} from './utils';
import {LayoutRenderer} from '../services';
import {CodeExecutor} from '../../../relations/src';

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
        return new DynamicItemLoader(inject(LAYOUT_COMPONENTS_MODULE_PROVIDERS, {optional: true}) ?? [],
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
                                          <ClassProvider>
                                          {
                                              provide: LAYOUT_METADATA_STORAGE,
                                              useClass: MetadataStorage,
                                          },
                                          CodeExecutor,
                                      ],
                                  });
}

/**
 * Enables use of custom layout metadata storage, used for custom components and custom templates and other components that needs to read metadata of other components
 * @param metadataStorageType - Type that will be used as layout metadata storage
 * 
 * Works with:
 * - **layout runtime**
 */
export function withLayoutMetadataStorage<TMetadata>(metadataStorageType: Type<MetadataStorage<TMetadata>>): DynamicFeature
{
    return new DynamicFeature(
    {
        layoutRuntime:
        {
            prependProviders: [],
            providers:
            [
                <ClassProvider>
                {
                    provide: LAYOUT_METADATA_STORAGE,
                    useClass: metadataStorageType,
                },
            ],
        },
    });
}