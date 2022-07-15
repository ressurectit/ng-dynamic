import {InjectionToken, Type} from '@angular/core';
import {DynamicModuleDataExtractor} from '@anglr/dynamic';

import {RelationsComponent} from '../interfaces';

/**
 * Injection token used for obtaining extractors for dynamic module relations
 */
export const DYNAMIC_MODULE_RELATIONS_EXTRACTORS: InjectionToken<DynamicModuleDataExtractor<Type<RelationsComponent>>[]> = new InjectionToken<DynamicModuleDataExtractor<Type<RelationsComponent>>[]>('DYNAMIC_MODULE_RELATIONS_EXTRACTORS');

// /**
//  * Injection token used for obtaining relations component loader
//  */
// export const RELATIONS_COMPONENT_LOADER: InjectionToken<DynamicItemLoader> = new InjectionToken<DynamicItemLoader>('RELATIONS_COMPONENT_LOADER', {factory: () =>
// {
//     return new DynamicItemLoader([],
//                                  inject(DYNAMIC_MODULE_RELATIONS_EXTRACTORS),
//                                  () => true,
//                                  inject(LOGGER),);
// }});
