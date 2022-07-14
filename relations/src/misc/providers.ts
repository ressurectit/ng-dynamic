import {ClassProvider} from '@angular/core';

import {DefaultDynamicModuleRelationsExtractor} from '../services';
import {DYNAMIC_MODULE_RELATIONS_EXTRACTORS} from './tokens';

/**
 * Provider for DefaultDynamicModuleRelationsExtractor implementation of DynamicModuleDataExtractor
 */
export const DEFAULT_DYNAMIC_MODULE_RELATIONS_EXTRACTOR: ClassProvider =
{
    provide: DYNAMIC_MODULE_RELATIONS_EXTRACTORS,
    useClass: DefaultDynamicModuleRelationsExtractor,
    multi: true
};