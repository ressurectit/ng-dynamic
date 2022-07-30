import {Type} from '@angular/core';
import {DynamicItemDefData} from '@anglr/dynamic';

import type {RelationsNode, RelationsNodeEditorData} from '../interfaces';
import type {RelationsEditorMetaInfo} from '../decorators';

/**
 * Represents available types for relations dynamic module
 */
export type RelationsModuleTypes = DynamicItemDefData<string[]>;

/**
 * Relations node definition
 */
export type RelationsNodeDef = DynamicItemDefData<Type<RelationsNode>> & RelationsEditorMetaInfo & RelationsNodeEditorData;

/**
 * Object used as void type of relation ouptuts with no data
 */
export type VoidObject = {};
