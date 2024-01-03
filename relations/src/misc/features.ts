import {ClassProvider, FactoryProvider, Type, inject} from '@angular/core';
import {LOGGER} from '@anglr/common';
import {CoreDynamicFeature, DynamicFeature, DynamicFeatureType, DynamicItemLoader, DynamicModuleDataExtractor, MetadataStorage} from '@anglr/dynamic';

import {RELATIONS_COMPONENTS_LOADER, RELATIONS_COMPONENTS_MODULE_DATA_EXTRACTORS, RELATIONS_COMPONENTS_MODULE_PROVIDERS, RELATIONS_METADATA_STORAGE} from './tokens';
import {relationsExportExtractor} from './extractors';
import {isRelationsComponentDef} from './utils';
import {CodeExecutor, RelationsChangeDetector, RelationsComponentManager, RelationsManager, RelationsProcessor} from '../services';

/**
 * Provider for default relations components extractor
 */
const DEFAULT_RELATIONS_COMPONENTS_EXTRACTOR: FactoryProvider =
{
    provide: RELATIONS_COMPONENTS_MODULE_DATA_EXTRACTORS,
    useFactory: () =>
    {
        return new DynamicModuleDataExtractor([
                                                  relationsExportExtractor,
                                              ],
                                              inject(LOGGER));
    },
    multi: true
};

/**
 * Provider for relations components loader
 */
const RELATIONS_COMPONENTS_LOADER_PROVIDER: FactoryProvider =
{
    provide: RELATIONS_COMPONENTS_LOADER,
    useFactory: () => new DynamicItemLoader(inject(RELATIONS_COMPONENTS_MODULE_PROVIDERS, {optional: true}) ?? [],
                                            inject(RELATIONS_COMPONENTS_MODULE_DATA_EXTRACTORS),
                                            isRelationsComponentDef,
                                            inject(LOGGER))
};

/**
 * Enables use of relations runtime core feature
 */
export function withRelationsRuntime(): CoreDynamicFeature
{
    return new CoreDynamicFeature(DynamicFeatureType.RelationsRuntime,
                                  {
                                      prependProviders: [],
                                      providers:
                                      [
                                          DEFAULT_RELATIONS_COMPONENTS_EXTRACTOR,
                                          RELATIONS_COMPONENTS_LOADER_PROVIDER,
                                          RelationsComponentManager,
                                          RelationsManager,
                                          RelationsProcessor,
                                          RelationsChangeDetector,
                                          //...provideRelationsDebugger(),
                                          CodeExecutor,
                                      ]
                                  });
}

/**
 * Enables use of custom relations metadata storage
 * @param metadataStorageType - Type that will be used as relations metadata storage
 */
export function withRelationsMetadataStorage<TMetadata>(metadataStorageType: Type<MetadataStorage<TMetadata>>): DynamicFeature
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
                    provide: RELATIONS_METADATA_STORAGE,
                    useClass: metadataStorageType,
                },
            ],
        },
    });
}