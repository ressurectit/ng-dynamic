import {inject, InjectionToken, Type} from '@angular/core';
import {DynamicItemLoader, DynamicModuleDataExtractor, DYNAMIC_ITEM_LOADER_PROVIDERS} from '@anglr/dynamic';
import {LOGGER} from '@anglr/common';

import {RelationsComponent} from '../interfaces';

/**
 * Injection token used for obtaining extractors for dynamic module relations
 */
export const DYNAMIC_MODULE_RELATIONS_EXTRACTORS: InjectionToken<DynamicModuleDataExtractor<Type<RelationsComponent>>[]> = new InjectionToken<DynamicModuleDataExtractor<Type<RelationsComponent>>[]>('DYNAMIC_MODULE_RELATIONS_EXTRACTORS');

/**
 * Injection token used for obtaining relations component loader
 */
export const RELATIONS_COMPONENT_LOADER: InjectionToken<DynamicItemLoader> = new InjectionToken<DynamicItemLoader>('RELATIONS_COMPONENT_LOADER', {factory: () =>
{
    return new DynamicItemLoader(inject(DYNAMIC_ITEM_LOADER_PROVIDERS),
                                 inject(DYNAMIC_MODULE_RELATIONS_EXTRACTORS),
                                 [],
                                 inject(LOGGER),);
}});
