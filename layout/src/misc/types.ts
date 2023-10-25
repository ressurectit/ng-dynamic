import {Type} from '@angular/core';
import {DynamicItemExtensions, DynamicItemDefData, DynamicItemEditorData} from '@anglr/dynamic';

import {LayoutComponent} from '../interfaces';

/**
 * Layout component definition
 */
export type LayoutComponentDef = DynamicItemDefData<Type<LayoutComponent>> & DynamicItemExtensions & DynamicItemEditorData;