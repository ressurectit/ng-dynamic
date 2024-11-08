import {Type, ɵComponentDef, ɵComponentType, ɵɵHostDirectivesFeature} from '@angular/core';
import {DynamicItemLoaderValidatorFn} from '@anglr/dynamic';
import {isBlank, isFunction, isPresent, isType} from '@jscrpt/common';

import {LayoutComponentDef} from './types';

/**
 * Checks whether data is layout component def
 * @param data - Data to be checked
 */
export const isLayoutComponentDef: DynamicItemLoaderValidatorFn<LayoutComponentDef> = function(data): data is LayoutComponentDef
{
    //type is required and must be type
    if(isBlank(data?.data) || !isType(data.data))
    {
        return false;
    }

    if(isPresent(data?.childExtensions) && (!Array.isArray(data.childExtensions) || data.childExtensions.some(itm => !isType(itm))))
    {
        return false;
    }

    if(isPresent(data?.extensions) && (!Array.isArray(data.extensions) || data.extensions.some(itm => !isType(itm))))
    {
        return false;
    }

    return true;
};

//TODO: move into common

/**
 * Symbol used for obtaining dynamic host directives
 */
const dynamicHostDirectivesSymbol = Symbol('dynamicHostDirectives');

/**
 * Applies dynamic host directive to type and removes all other dynamicaly applied directives
 * @param type - Type to be updated
 * @param directives - Array of directives that should be added, if empty, or unspecified only removes dynamically applied directives
 */
export function applyDynamicHostDirective(type: Type<unknown>, directives?: Type<unknown>[]|undefined|null): void
{
    const componentDef = ((type as unknown as ɵComponentType<unknown>).ɵcmp as ɵComponentDef<unknown>);
    const dynamicHostDirectives: Type<unknown>[] = [];

    // dynamic host directives already exists
    if(Reflect.has(type, dynamicHostDirectivesSymbol))
    {
        const directives = Reflect.get(type, dynamicHostDirectivesSymbol) as Type<unknown>[];

        if(componentDef.hostDirectives)
        {
            for(const directive of directives)
            {
                const index = componentDef.hostDirectives.findIndex(itm => 
                {
                    if(isFunction(itm))
                    {
                        console.warn('Function was not expected!');

                        return;
                    }
                    
                    itm.directive == directive;
                });

                if(index < 0)
                {
                    continue;
                }

                componentDef.hostDirectives.splice(index, 1);
            }
        }
    }

    Reflect.set(type, dynamicHostDirectivesSymbol, dynamicHostDirectives);

    //enable host directives to work
    if(!componentDef.findHostDirectiveDefs)
    {
        const feature = ɵɵHostDirectivesFeature([]);

        componentDef.features?.unshift(feature);
        feature(componentDef);
    }

    if(directives?.length)
    {
        componentDef.hostDirectives ??= [];
    
        for(const directive of directives)
        {
            componentDef.hostDirectives.push({directive: directive, inputs: {}, outputs: {}});
            dynamicHostDirectives.push(directive);
        }
    }
}