import {Type} from '@angular/core';
import {DynamicItem, DynamicItemExtension, DynamicItemExtensions, DynamicItemDefData} from '@anglr/dynamic';

/**
 * Layout component definition
 */
export type LayoutComponentDef = DynamicItemDefData<Type<DynamicItem>> & DynamicItemExtensions<DynamicItemExtension>;