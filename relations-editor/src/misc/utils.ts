import {DynamicItemLoaderValidatorFn} from '@anglr/dynamic';
import {isBlank, isBoolean, isJsObject, isPresent, isString, isType} from '@jscrpt/common';

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

    //display name should be string if used
    if(isPresent(data.displayName) && !isString(data.displayName))
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
