import {Type} from '@angular/core';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Func1} from '@jscrpt/common';

/**
 * Symbol used for storing descendants getter
 */
const descendantsGetterSymbol = Symbol('descendantsGetter');

/**
 * Defines function for dynamic component which is used for obtaining its descendants
 * @param descendantsGetterFn - Function used for obtaining descendants of dynamic component
 */
export function DescendantsGetter<TOptions = unknown>(descendantsGetterFn: Func1<LayoutComponentMetadata[], TOptions|undefined|null>): ClassDecorator
{
    return function <TFunction extends Function> (target: TFunction): TFunction
    {
        Object.defineProperty(target,
                              descendantsGetterSymbol,
                              {
                                  writable: false,
                                  configurable: false,
                                  enumerable: false,
                                  value: descendantsGetterFn,
                              });

        return target;
    };
}

/**
 * Gets descendants getter if is set
 * @param type - Type which could contains descendants getter
 */
export function getDescendantsGetter<TOptions = unknown>(type: Type<unknown>): Func1<LayoutComponentMetadata[], TOptions|undefined|null>|undefined|null
{
    if(descendantsGetterSymbol in type)
    {
        return (type as any)[descendantsGetterSymbol];
    }

    return null;
}