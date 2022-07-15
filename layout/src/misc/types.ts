import {Type} from '@angular/core';
import {DynamicItemExtension, DynamicItemExtensions, DynamicItemDefData} from '@anglr/dynamic';

import {LayoutComponent} from '../interfaces';

/**
 * Layout component definition
 */
export type LayoutComponentDef = DynamicItemDefData<Type<LayoutComponent>> & DynamicItemExtensions<DynamicItemExtension>;