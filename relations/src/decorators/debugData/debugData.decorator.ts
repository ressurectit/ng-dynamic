import {Injector} from '@angular/core';
import {Func2} from '@jscrpt/common';

import {RelationsComponentEndpoints} from '../../services/relationsDebugger/relationsDebugger.interface';

/**
 * Debug data symbol
 */
const DEBUG_DATA_SYMBOL = Symbol('DebugData');

/**
 * Definition of debug data for obtaining endpoints
 */
export interface RelationsDebugData<TRelations = unknown> extends Partial<RelationsComponentEndpoints>
{
    /**
     * Function used for obtaining dynamic 
     */
    dynamicEndpointsGetter?: Func2<RelationsComponentEndpoints, TRelations, Injector>;
}

/**
 * Gets debug data if defined
 * @param obj - Object to be inspected
 */
export function getDebugData(obj: unknown): RelationsDebugData|undefined|null
{
    return Reflect.get(obj as object, DEBUG_DATA_SYMBOL);
}

/**
 * Marks component as pure relations component, cant be used on component that is also layout component!
 */
export function DebugData<TRelations = unknown>(data: RelationsDebugData<TRelations>): ClassDecorator
{
    if(ngRelationsDebugger)
    {
        return function <TFunction extends Function> (target: TFunction): TFunction
        {
            Reflect.defineProperty(target,
                                   DEBUG_DATA_SYMBOL,
                                   {
                                       value: data,
                                   });

            return target;
        };
    }

    return function <TFunction extends Function> (target: TFunction): TFunction
    {
        return target;
    };
}