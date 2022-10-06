import {ClassProvider, ExistingProvider, FactoryProvider, inject, Optional, ValueProvider} from '@angular/core';
import {defaultExportExtractor, DynamicItemLoader, DynamicModuleDataExtractor, MetadataHistoryManager, METADATA_STATE_MANAGER} from '@anglr/dynamic';
import {LAYOUT_COMPONENTS_MODULE_DATA_EXTRACTORS, LAYOUT_COMPONENTS_MODULE_PROVIDERS, LAYOUT_COMPONENT_TRANSFORM} from '@anglr/dynamic/layout';
import {LOGGER, Logger} from '@anglr/common';

import {LayoutDesignerDynamicModuleItemsProvider, LayoutEditorMetadataManager} from '../services';
import {LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES, LAYOUT_HISTORY_MANAGER, LAYOUT_MODULE_TYPES_DATA_EXTRACTORS, LAYOUT_MODULE_TYPES_LOADER, LAYOUT_MODULE_TYPES_PROVIDERS} from './tokens';
import {layoutDesignerComponentTransform} from './transforms/layoutDesignerComponentTransform';
import {LayoutPropertyMetadata} from './types';
import {isLayoutModuleTypes} from './utils';
import {layoutDesignerTypeExtractor} from './extractors';

/**
 * Provider for designer layout components extractor
 */
export const DESIGNER_LAYOUT_COMPONENTS_EXTRACTOR: FactoryProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_DATA_EXTRACTORS,
    useFactory: (logger?: Logger) =>
    {
        return new DynamicModuleDataExtractor([
                                                  layoutDesignerTypeExtractor,
                                              ],
                                              logger);
    },
    deps: [[new Optional(), LOGGER]],
    multi: true
};

/**
 * Provider for layout designer components providers
 */
export const LAYOUT_DESIGNER_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_PROVIDERS,
    useClass: LayoutDesignerDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for LAYOUT_COMPONENT_TRANSFORM, which allows transformation for layout designer component
 */
export const LAYOUT_DESIGNER_COMPONENT_TRANSFORM: ValueProvider =
{
    provide: LAYOUT_COMPONENT_TRANSFORM,
    useValue: layoutDesignerComponentTransform
};

/**
 * Provider for default layout module types extractor
 */
export const DEFAULT_LAYOUT_MODULE_TYPES_EXTRACTOR: FactoryProvider =
{
    provide: LAYOUT_MODULE_TYPES_DATA_EXTRACTORS,
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
 * Provider for layout editor property metadata
 */
export const LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES_PROVIDER: ValueProvider =
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
export const LAYOUT_MODULE_TYPES_LOADER_PROVIDER: FactoryProvider =
{
    provide: LAYOUT_MODULE_TYPES_LOADER,
    useFactory: () => new DynamicItemLoader(inject(LAYOUT_MODULE_TYPES_PROVIDERS),
                                            inject(LAYOUT_MODULE_TYPES_DATA_EXTRACTORS),
                                            isLayoutModuleTypes,
                                            inject(LOGGER, {optional: true}) ?? undefined,
                                            true)
};

/**
 * Provider for layout history manager state
 */
export const LAYOUT_HISTORY_MANAGER_STATE: ExistingProvider =
{
    provide: METADATA_STATE_MANAGER,
    useExisting: LayoutEditorMetadataManager,
};

/**
 * Provider for layout history manager
 */
export const LAYOUT_HISTORY_MANAGER_PROVIDER: ClassProvider =
{
    provide: LAYOUT_HISTORY_MANAGER,
    useClass: MetadataHistoryManager
};