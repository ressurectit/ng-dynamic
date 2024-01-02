import {ClassProvider, Provider, Type} from '@angular/core';
import {DefaultsOverride, DynamicItemLoaderValidatorFn, provideStaticPackageSource} from '@anglr/dynamic';
import {isBlank, isBoolean, isJsObject, isPresent, isString, isType} from '@jscrpt/common';

import {DEFAULT_RELATIONS_MODULE_TYPES_EXTRACTOR, DEFAULT_RELATIONS_NODES_EXTRACTOR, RELATIONS_MODULE_TYPES_LOADER_PROVIDER, RELATIONS_NODES_LOADER_PROVIDER, COMPONENTS_RELATIONS_NODES_EXTRACTOR, STATIC_COMPONENTS_RELATIONS_NODES_PROVIDER, STATIC_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER, RELATIONS_HISTORY_MANAGER_STATE, RELATIONS_HISTORY_MANAGER_PROVIDER} from './providers';
import type {RelationsModuleTypes, RelationsNodeDef} from './types';
import {RelationsNodeManager, ScopeRegister, StaticComponentsRegister} from '../services';
import {RELATIONS_DEFAULTS_OVERRIDE} from './tokens';

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

/**
 * Default providers for relations editor subpackage
 */
export function provideRelationsEditor(): Provider[]
{
    return [
        DEFAULT_RELATIONS_NODES_EXTRACTOR,
        COMPONENTS_RELATIONS_NODES_EXTRACTOR,
        DEFAULT_RELATIONS_MODULE_TYPES_EXTRACTOR,
        RELATIONS_MODULE_TYPES_LOADER_PROVIDER,
        RELATIONS_NODES_LOADER_PROVIDER,
        RelationsNodeManager,
        ScopeRegister,
        RELATIONS_HISTORY_MANAGER_STATE,
        RELATIONS_HISTORY_MANAGER_PROVIDER,
    ];
}

/**
 * Providers for relations editor subpackage, with support of static components
 * @param staticRegister - Type that represents implementation of static components register
 */
export function provideRelationsEditorWithStatic(staticRegister: Type<StaticComponentsRegister>): Provider[]
{
    return [
        ...provideRelationsEditor(),
        STATIC_COMPONENTS_RELATIONS_NODES_PROVIDER,
        STATIC_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER,
        <ClassProvider>
        {
            provide: StaticComponentsRegister,
            useClass: staticRegister
        },
        provideStaticPackageSource('static-components'),
    ];
}

/**
 * Provider for relations defaults override
 * @param defaultsOverride - Service to pride as relations defaults override
 */
export function provideRelationsDefaultOverride(defaultsOverride: Type<DefaultsOverride>): Provider
{
    return <ClassProvider>{
        provide: RELATIONS_DEFAULTS_OVERRIDE,
        useClass: defaultsOverride
    };
}
