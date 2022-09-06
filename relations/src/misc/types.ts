import {DynamicItemDefData} from '@anglr/dynamic';

import {RelationsComponent, RelationsComponentType} from '../interfaces';
import {RelationsComponentManagerComponentData} from '../services/relationsComponentManager/relationsComponentManager.interface';

/**
 * Relations component definition
 */
export type RelationsComponentDef = DynamicItemDefData<RelationsComponentType>;

/**
 * Instance of relations processor component
 */
export type RelationsProcessorComponent = RelationsComponent&RelationsComponentManagerComponentData;