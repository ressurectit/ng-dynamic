import {Type} from '@angular/core';
import {DynamicItemDefData} from '@anglr/dynamic';

import type {RelationsNode} from '../interfaces';
import type {RelationsEditorMetaInfo} from '../decorators';

/**
 * Represents available types for relations dynamic module
 */
export type RelationsModuleTypes = DynamicItemDefData<string[]>;

/**
 * Relations node definition
 */
export type RelationsNodeDef = DynamicItemDefData<Type<RelationsNode>> & RelationsEditorMetaInfo & {singleton?: boolean};

/**
 * Object used as void type of relation ouptuts with no data
 */
export type VoidObject = {};
