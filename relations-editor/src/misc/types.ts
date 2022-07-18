import {Type} from '@angular/core';
import {DynamicItemDefData} from '@anglr/dynamic';

import {RelationsNode} from '../interfaces';

/**
 * Represents available types for relations dynamic module
 */
export type RelationsModuleTypes = DynamicItemDefData<string[]>;

/**
 * Relations node definition
 */
export type RelationsNodeDef = DynamicItemDefData<Type<RelationsNode>>;