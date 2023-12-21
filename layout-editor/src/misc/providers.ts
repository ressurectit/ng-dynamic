import {ClassProvider, ExistingProvider, FactoryProvider, inject, ValueProvider} from '@angular/core';
import {defaultExportExtractor, DynamicItemLoader, DynamicModuleDataExtractor, MetadataHistoryManager, EDITOR_METADATA_MANAGER} from '@anglr/dynamic';
import {LAYOUT_COMPONENTS_MODULE_DATA_EXTRACTORS, LAYOUT_COMPONENTS_MODULE_PROVIDERS, LayoutRenderer} from '@anglr/dynamic/layout';
import {LOGGER} from '@anglr/common';

import {LayoutDesignerDynamicModuleItemsProvider, LayoutEditorMetadataManager, LayoutEditorRenderer} from '../services';
import {LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES, LAYOUT_HISTORY_MANAGER, LAYOUT_MODULE_TYPES_DATA_EXTRACTORS, LAYOUT_MODULE_TYPES_LOADER, LAYOUT_MODULE_TYPES_PROVIDERS} from './tokens';
import {LayoutPropertyMetadata} from './types';
import {isLayoutModuleTypes} from './utils';
import {layoutDesignerTypeExtractor} from './extractors';

//TODO: move into feature all providers and make them non exported

/**
 * Layout renderer for layout editor
 */
export const EDITOR_LAYOUT_RENDERER: ExistingProvider =
{
    provide: LayoutRenderer,
    useExisting: LayoutEditorRenderer,
};

/**
 * Provider for designer layout components extractor
 */
export const DESIGNER_LAYOUT_COMPONENTS_EXTRACTOR: FactoryProvider =
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
export const LAYOUT_DESIGNER_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_PROVIDERS,
    useClass: LayoutDesignerDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for default layout module types extractor
 */
export const DEFAULT_LAYOUT_MODULE_TYPES_EXTRACTOR: FactoryProvider =
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
                                            inject(LOGGER),
                                            true)
};

/**
 * Provider for layout metadata manager state
 */
export const LAYOUT_EDITOR_METADATA_MANAGER: ExistingProvider =
{
    provide: EDITOR_METADATA_MANAGER,
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