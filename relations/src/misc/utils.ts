import {Provider} from '@angular/core';
import {DynamicItemLoaderValidatorFn} from '@anglr/dynamic';
import {isBlank, isType} from '@jscrpt/common';

import {RelationsComponentDef} from './types';
import {BASIC_COMPONENTS_RELATIONS_COMPONENTS_PROVIDER, DEFAULT_RELATIONS_COMPONENTS_EXTRACTOR} from './providers';

/**
 * Checks whether data is relations component def
 * @param data - Data to be checked
 */
export const isRelationsComponentDef: DynamicItemLoaderValidatorFn<RelationsComponentDef> = function(data): data is RelationsComponentDef
{
    //type is required and must be type
    if(isBlank(data?.data) || !isType(data.data))
    {
        return false;
    }

    return true;
};

/**
 * Default providers for relations subpackage
 */
export function provideRelations(): Provider[]
{
    return [
        BASIC_COMPONENTS_RELATIONS_COMPONENTS_PROVIDER,
        DEFAULT_RELATIONS_COMPONENTS_EXTRACTOR,
    ];
}