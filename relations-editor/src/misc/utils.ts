import {Provider} from '@angular/core';
import {DynamicItemLoaderValidatorFn} from '@anglr/dynamic';
import {isBlank, isBoolean, isJsObject, isPresent, isType} from '@jscrpt/common';

import {BASIC_COMPONENTS_RELATIONS_NODES_PROVIDER, DEFAULT_RELATIONS_MODULE_TYPES_EXTRACTOR, DEFAULT_RELATIONS_NODES_EXTRACTOR, DYNAMIC_RELATIONS_MODULE_TYPES_PROVIDER, STATIC_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER, STATIC_COMPONENTS_RELATIONS_NODES_EXTRACTOR, STATIC_COMPONENTS_RELATIONS_NODES_PROVIDER} from './providers';
import type {RelationsModuleTypes, RelationsNodeDef} from './types';

/**
 * Clamps number between two values
 * @param num - Number to clamp 
 * @param min - Minimum value
 * @param max - Maximum value
 */
export function clamp(num: number, min: number, max: number): number
{
    return Math.min(Math.max(num, min), max);
}

/**
 * Checks whether data is relations module types
 * @param data - Data to be checked
 */
export const isRelationsModuleTypes: DynamicItemLoaderValidatorFn<RelationsModuleTypes> = function(data): data is RelationsModuleTypes
{
    if(isBlank(data?.data) || !Array.isArray(data.data))
    {
        return false;
    }

    return true;
};

/**
 * Checks whether data is relations node def
 * @param data - Data to be checked
 */
export const isRelationsNodeDef: DynamicItemLoaderValidatorFn<RelationsNodeDef> = function(data): data is RelationsNodeDef
{
    //type is required and must be type
    if(isBlank(data?.data) || !isType(data.data))
    {
        return false;
    }

    //singleton should be boolean if used
    if(isPresent(data.singleton) && !isBoolean(data.singleton))
    {
        return false;
    }

    //meta info should be object if used
    if(isPresent(data?.metaInfo) && !isJsObject(data.metaInfo))
    {
        return false;
    }

    return true;
};

/**
 * Default providers for relations editor subpackage
 */
export function provideRelationsEditor(): Provider[]
{
    return [
        BASIC_COMPONENTS_RELATIONS_NODES_PROVIDER,
        STATIC_COMPONENTS_RELATIONS_NODES_PROVIDER,
        DYNAMIC_RELATIONS_MODULE_TYPES_PROVIDER,
        STATIC_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER,
        DEFAULT_RELATIONS_NODES_EXTRACTOR,
        STATIC_COMPONENTS_RELATIONS_NODES_EXTRACTOR,
        DEFAULT_RELATIONS_MODULE_TYPES_EXTRACTOR,
    ];
}