import {ClassProvider, FactoryProvider, inject, Optional, ValueProvider} from '@angular/core';
import {defaultExportExtractor, DynamicItemLoader, DynamicModuleDataExtractor, MetadataHistoryManager, METADATA_HISTORY_MANAGER_GET_STATE} from '@anglr/dynamic';
import {LAYOUT_COMPONENTS_MODULE_PROVIDERS, LAYOUT_COMPONENT_TRANSFORM} from '@anglr/dynamic/layout';
import {LOGGER, Logger} from '@anglr/common';

import {DefaultDynamicModuleTypesProvider, LayoutDesignerDynamicModuleItemsProvider, LayoutEditorMetadataManager} from '../services';
import {LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES, LAYOUT_HISTORY_MANAGER, LAYOUT_MODULE_TYPES_DATA_EXTRACTORS, LAYOUT_MODULE_TYPES_LOADER, LAYOUT_MODULE_TYPES_PROVIDERS} from './tokens';
import {layoutDesignerComponentTransform} from './transforms/layoutDesignerComponentTransform';
import {LayoutPropertyMetadata} from './types';
import {isLayoutModuleTypes} from './utils';

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
 * Provider for default dynamic layout module types provider
 */
export const DYNAMIC_LAYOUT_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: LAYOUT_MODULE_TYPES_PROVIDERS,
    useClass: DefaultDynamicModuleTypesProvider,
    multi: true
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
                                            inject(LOGGER, {optional: true}) ?? undefined)
};

/**
 * Provider for layout history manager get state function
 */
export const LAYOUT_HISTORY_MANAGER_GET_STATE: FactoryProvider =
{
    provide: METADATA_HISTORY_MANAGER_GET_STATE,
    useFactory: () =>
    {
        const manager = inject(LayoutEditorMetadataManager);

        return manager.getMetadata.bind(manager);
    }
};

/**
 * Provider for layout history manager
 */
export const LAYOUT_HISTORY_MANAGER_PROVIDER: ClassProvider =
{
    provide: LAYOUT_HISTORY_MANAGER,
    useClass: MetadataHistoryManager
};