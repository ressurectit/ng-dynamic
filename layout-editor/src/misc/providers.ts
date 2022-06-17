import {ClassProvider, ValueProvider} from '@angular/core';
import {DYNAMIC_ITEM_LOADER_PROVIDERS} from '@anglr/dynamic';
import {LAYOUT_COMPONENT_TRANSFORM} from '@anglr/dynamic/layout';

import {LayoutDesignerDynamicItemLoaderProvider} from '../services';
import {layoutDesignerComponentTransform} from './utils';

/**
 * Provider for LayoutDesignerDynamicItemLoaderProvider implementation of DynamicItemLoaderProvider
 */
export const LAYOUT_DESIGNER_DYNAMIC_ITEM_LOADER_PROVIDER: ClassProvider =
{
    provide: DYNAMIC_ITEM_LOADER_PROVIDERS,
    useClass: LayoutDesignerDynamicItemLoaderProvider,
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
