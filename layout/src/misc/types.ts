import {Type} from '@angular/core';
import {DynamicItemExtensions, DynamicItemDefData} from '@anglr/dynamic';

import {LayoutComponent} from '../interfaces';

/**
 * Layout component definition
 */
export type LayoutComponentDef = DynamicItemDefData<Type<LayoutComponent>> & DynamicItemExtensions;