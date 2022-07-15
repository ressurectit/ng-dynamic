import {Type} from '@angular/core';
import {DynamicItemDefData, DynamicModule, DynamicModuleDataExtractorFn} from '@anglr/dynamic';
import {isPresent, isType} from '@jscrpt/common';

import {RelationsComponent} from '../../interfaces';
import {isRelationsComponentType} from '../../decorators';

/**
 * Module with relations exports
 */
interface ɵDynamicModuleWithRelations extends DynamicModule
{
    /**
     * Default export value
     */
    default?: Type<RelationsComponent>;

    /**
     * Relations named export value
     */
    relations?: Type<RelationsComponent>;
}

/**
 * Extracts dynamic relations from default locations
 * 
 * - relations export
 * - default export
 */
export const relationsExportExtractor: DynamicModuleDataExtractorFn<DynamicItemDefData<Type<RelationsComponent>>> = (module, logger) =>
{
    const localModule = module as ɵDynamicModuleWithRelations;

    logger?.debug('relationsExportExtractor: trying to extract dynamic relations');

    if(isPresent(localModule.relations) && isType(localModule.relations) && isRelationsComponentType(localModule.relations))
    {
        return {
            data: localModule.relations
        };
    }

    if(isPresent(localModule.default) && isType(localModule.default) && isRelationsComponentType(localModule.default))
    {
        return {
            data: localModule.default
        };
    }

    return null;
};