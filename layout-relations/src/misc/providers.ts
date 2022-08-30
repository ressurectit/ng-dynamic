import {ClassProvider} from '@angular/core';
import {RELATIONS_MODULE_TYPES_PROVIDERS, RELATIONS_NODES_PROVIDERS} from '@anglr/dynamic/relations-editor';

import {LayoutComponentsRelationsNodesProvider, LayoutComponentsRelationsTypesProvider, RelationsComponentsRelationsNodesProvider, RelationsComponentsRelationsTypesProvider} from '../services';

/**
 * Provider for layout components relations nodes provider
 */
export const LAYOUT_COMPONENTS_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: LayoutComponentsRelationsNodesProvider,
    multi: true
};

/**
 * Provider for layout components relations types provider
 */
export const LAYOUT_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: LayoutComponentsRelationsTypesProvider,
    multi: true
};

/**
 * Provider for relations components relations nodes provider
 */
export const RELATIONS_COMPONENTS_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: RelationsComponentsRelationsNodesProvider,
    multi: true
};

/**
 * Provider for relations components relations types provider
 */
export const RELATIONS_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: RelationsComponentsRelationsTypesProvider,
    multi: true
};