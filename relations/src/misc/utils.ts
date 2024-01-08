import {inject, Provider} from '@angular/core';
import {DynamicItemLoaderValidatorFn} from '@anglr/dynamic';
import {Dictionary, isBlank, isType} from '@jscrpt/common';

import {RelationsComponentDef} from './types';
import {RelationsDebugger} from '../services';
import {RELATIONS_DEBUGGER_TYPE} from './tokens';

//TODO: skip init as constant
//TODO: assigned as constant

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
 * Provides relations debugger
 */
export function provideRelationsDebugger(): Provider[]
{
    return ngRelationsDebugger ?
        [
            {
                provide: RelationsDebugger,
                useFactory: () =>
                {
                    const relationsDebuggerType = inject(RELATIONS_DEBUGGER_TYPE, {optional: true});

                    if(!relationsDebuggerType)
                    {
                        throw new Error('Please provide RelationsDebugger implementation type! Use "provideRelationsDebuggerImplementation() from @anglr/dynamic/relations-debugger"');
                    }

                    return new relationsDebuggerType();
                },
            }
        ] :
        [];
}

/**
 * Defines skip initial data transfer for relations for specified property
 * @param object - Object which will have this new property defined
 * @param name - Name of property for which is skip init defined
 */
export function defineSkipInitProp<TObj>(object: TObj, name: string): void
{
    const propName = `${name}SkipInit`;

    if(!Reflect.has(object as object, propName))
    {
        Object.defineProperty(object,
                              propName,
                              {
                                  value: true,
                              });
    }
}

/**
 * Tests whether there is skip init defined for property
 * @param object - Object containg skip init property to be tested
 * @param name - Name of property for which should be skip init defined
 * @returns 
 */
export function isSkipInit<TObj>(object: TObj, name: string): boolean
{
    return (object as unknown as Dictionary<boolean>)[`${name}SkipInit`];
}

/**
 * Defines indication that property was at least once assigned for specified property
 * @param object - Object which will have this new property defined
 * @param name - Name of property for which is assigned defined
 */
export function defineAssignedProp<TObj>(object: TObj, name: string): void
{
    const propName = `${name}Assigned`;

    if(!Reflect.has(object as object, propName))
    {
        Object.defineProperty(object,
                              propName,
                              {
                                  value: true,
                              });
    }
}

/**
 * Tests whether there is assigned defined for property
 * @param object - Object containg assigned property to be tested
 * @param name - Name of property for which should be assigned defined
 * @returns 
 */
export function isAssigned<TObj>(object: TObj, name: string): boolean
{
    return (object as unknown as Dictionary<boolean>)[`${name}Assigned`];
}