import {ClassProvider, ExistingProvider, FactoryProvider, Type, ValueProvider, inject} from '@angular/core';
import {LOGGER} from '@anglr/common';
import {CoreDynamicFeature, defaultExportExtractor, DefaultsOverride, DynamicFeature, DynamicFeatureType, DynamicItemLoader, DynamicModuleDataExtractor, EDITOR_METADATA_MANAGER, MetadataHistoryManager, PackageManager} from '@anglr/dynamic';
import {LAYOUT_COMPONENTS_MODULE_DATA_EXTRACTORS, LAYOUT_COMPONENTS_MODULE_PROVIDERS, LayoutRenderer, withLayoutRuntime} from '@anglr/dynamic/layout';

import {DragActiveService, LayoutComponentsIteratorService, LayoutDesignerDynamicModuleItemsProvider, LayoutEditorMetadataExtractor, LayoutEditorMetadataManager, LayoutEditorPropertyMetadataExtractor, LayoutEditorRenderer, LiveEventService} from '../services';
import {layoutDesignerTypeExtractor} from './extractors';
import {LAYOUT_DEFAULTS_OVERRIDE, LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES, LAYOUT_HISTORY_MANAGER, LAYOUT_MODULE_TYPES_DATA_EXTRACTORS, LAYOUT_MODULE_TYPES_LOADER, LAYOUT_MODULE_TYPES_PROVIDERS} from './tokens';
import {LayoutPropertyMetadata} from './types';
import {isLayoutModuleTypes} from './utils';
import {DndBusService} from '../modules/layoutDndCore/services/dndBus/dndBus.service';
import {PlaceholderRenderer} from '../modules/layoutDndCore/services/placeholderRenderer';

/**
 * Provider for designer layout components extractor
 */
const DESIGNER_LAYOUT_COMPONENTS_EXTRACTOR: FactoryProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_DATA_EXTRACTORS,
    useFactory: () =>
    {
        return new DynamicModuleDataExtractor([
                                                  layoutDesignerTypeExtractor,
                                              ],
                                              inject(LOGGER));
    },
    multi: true
};

/**
 * Provider for layout designer components providers
 */
const LAYOUT_DESIGNER_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_PROVIDERS,
    useClass: LayoutDesignerDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for default layout module types extractor
 */
const DEFAULT_LAYOUT_MODULE_TYPES_EXTRACTOR: FactoryProvider =
{
    provide: LAYOUT_MODULE_TYPES_DATA_EXTRACTORS,
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
 * Provider for layout editor property metadata
 */
const LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES_PROVIDER: ValueProvider =
{
    provide: LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES,
    useValue:
    [
        LayoutPropertyMetadata
    ]
};

/**
 * Provider for layout module types loader
 */
const LAYOUT_MODULE_TYPES_LOADER_PROVIDER: FactoryProvider =
{
    provide: LAYOUT_MODULE_TYPES_LOADER,
    useFactory: () => new DynamicItemLoader(inject(LAYOUT_MODULE_TYPES_PROVIDERS, {optional: true}) ?? [],
                                            inject(LAYOUT_MODULE_TYPES_DATA_EXTRACTORS),
                                            isLayoutModuleTypes,
                                            true,)
};

/**
 * Provider for layout metadata manager state
 */
const LAYOUT_EDITOR_METADATA_MANAGER: ExistingProvider =
{
    provide: EDITOR_METADATA_MANAGER,
    useExisting: LayoutEditorMetadataManager,
};

/**
 * Provider for layout history manager
 */
const LAYOUT_HISTORY_MANAGER_PROVIDER: ClassProvider =
{
    provide: LAYOUT_HISTORY_MANAGER,
    useClass: MetadataHistoryManager
};

/**
 * Enables use of layout editor core feature
 */
export function withLayoutEditor(): CoreDynamicFeature
{
    return new CoreDynamicFeature(DynamicFeatureType.LayoutEditor,
                                  {
                                      prependProviders: 
                                      [
                                          DESIGNER_LAYOUT_COMPONENTS_EXTRACTOR,
                                      ],
                                      providers: 
                                      [
                                          LAYOUT_DESIGNER_COMPONENTS_PROVIDER,
                                          LAYOUT_MODULE_TYPES_LOADER_PROVIDER,
                                          DEFAULT_LAYOUT_MODULE_TYPES_EXTRACTOR,
                                          LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES_PROVIDER,
                                          LayoutEditorMetadataExtractor,
                                          LayoutEditorPropertyMetadataExtractor,
                                          LayoutEditorMetadataManager,
                                          DndBusService,
                                          PlaceholderRenderer,
                                          DragActiveService,
                                          //TODO: make it into feature
                                          LiveEventService,
                                          LayoutComponentsIteratorService,
                                          LayoutEditorRenderer,
                                          <ExistingProvider>
                                          {
                                              provide: LayoutRenderer,
                                              useExisting: LayoutEditorRenderer,
                                          },
                                          <FactoryProvider>
                                          {
                                              provide: PackageManager,
                                              useFactory: () => new PackageManager(),
                                          },
                                          LAYOUT_HISTORY_MANAGER_PROVIDER,
                                          LAYOUT_EDITOR_METADATA_MANAGER,
                                      ]
                                  },
                                  withLayoutRuntime());
}

/**
 * Enables use of defaults options overrides for layout components 
 * @param defaultsOverride - Defaults override implementation
 * 
 * Works with:
 * - **layout editor**
 */
export function withLayoutDefaultsOverride(defaultsOverride: Type<DefaultsOverride>): DynamicFeature
{
    return new DynamicFeature(
    {
        layoutEditor:
        {
            prependProviders: [],
            providers:
            [
                <ClassProvider>
                {
                    provide: LAYOUT_DEFAULTS_OVERRIDE,
                    useClass: defaultsOverride
                }
            ],
        },
    });
}
