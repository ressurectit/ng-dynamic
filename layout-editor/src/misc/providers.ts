import {ClassProvider, FactoryProvider, Optional, ValueProvider} from '@angular/core';
import {DefaultDynamicModuleTypesProvider, defaultExportExtractor, DynamicModuleDataExtractor} from '@anglr/dynamic';
import {LAYOUT_COMPONENTS_MODULE_PROVIDERS, LAYOUT_COMPONENT_TRANSFORM} from '@anglr/dynamic/layout';
import {LOGGER, Logger} from '@anglr/common';

import {LayoutDesignerDynamicModuleItemsProvider} from '../services';
import {LAYOUT_MODULE_TYPES_DATA_EXTRACTORS, LAYOUT_MODULE_TYPES_PROVIDERS} from './tokens';
import {layoutDesignerComponentTransform} from './transforms/layoutDesignerComponentTransform';

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
 * Provider for default dynamic layout module types provider for all built-in types in dynamic
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