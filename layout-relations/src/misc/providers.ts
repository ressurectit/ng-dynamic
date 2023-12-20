import {ClassProvider} from '@angular/core';
import {LAYOUT_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/layout';
import {LAYOUT_MODULE_TYPES_PROVIDERS} from '@anglr/dynamic/layout-editor';
import {RELATIONS_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/relations';
import {RELATIONS_MODULE_TYPES_PROVIDERS, RELATIONS_NODES_PROVIDERS} from '@anglr/dynamic/relations-editor';

import {LayoutComponentsRelationsNodesProvider, LayoutComponentsRelationsTypesProvider, CustomComponentsDynamicModuleItemsProvider, CustomComponentsDynamicModuleRelationsProvider, CustomComponentsDynamicModuleTypesProvider, CustomRelationsDynamicModuleItemsProvider, CustomRelationsDynamicModuleRelationsProvider} from '../services';

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
 * Provider for custom components package layout components provider
 */
export const CUSTOM_COMPONENTS_LAYOUT_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: LAYOUT_COMPONENTS_MODULE_PROVIDERS,
    useClass: CustomComponentsDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for custom components dynamic layout module types provider
 */
export const CUSTOM_COMPONENTS_LAYOUT_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: LAYOUT_MODULE_TYPES_PROVIDERS,
    useClass: CustomComponentsDynamicModuleTypesProvider,
    multi: true
};

/**
 * Provider for custom components dynamic relations types provider
 */
export const CUSTOM_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: CustomComponentsDynamicModuleRelationsProvider,
    multi: true
};

/**
 * Provider for custom components package relations nodes provider
 */
export const CUSTOM_COMPONENTS_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: CustomComponentsDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for custom components package relations components provider
 */
export const CUSTOM_COMPONENTS_RELATIONS_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: RELATIONS_COMPONENTS_MODULE_PROVIDERS,
    useClass: CustomComponentsDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for custom relations dynamic relations types provider
 */
export const CUSTOM_RELATIONS_RELATIONS_MODULE_TYPES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_MODULE_TYPES_PROVIDERS,
    useClass: CustomRelationsDynamicModuleRelationsProvider,
    multi: true
};

/**
 * Provider for custom relations package relations nodes provider
 */
export const CUSTOM_RELATIONS_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: CustomRelationsDynamicModuleItemsProvider,
    multi: true
};

/**
 * Provider for custom relations package relations components provider
 */
export const CUSTOM_RELATIONS_RELATIONS_COMPONENTS_PROVIDER: ClassProvider =
{
    provide: RELATIONS_COMPONENTS_MODULE_PROVIDERS,
    useClass: CustomRelationsDynamicModuleItemsProvider,
    multi: true
};