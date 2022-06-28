import {Type} from '@angular/core';
import {extend} from '@jscrpt/common';

/**
 * Copies properties and metadata from class definition to applied class
 * @param classDefinition - Class containing definition of metadata
 * @param metadataSymbols - Symbols that are storing metadata and are copied
 */
export function MetadataClassMixin(classDefinition: Type<any>, metadataSymbols: Array<symbol|string>): ClassDecorator
{
    return function <TFunction extends Function> (target: TFunction): TFunction
    {
        // save a reference to the original constructor
        const original = target as unknown as Type<any>;

        // the new constructor behaviour
        const classMixin = function(...args: any[])
        {
            const instance = new original(...args);
            extend(true, instance, Reflect.construct(classDefinition, args));

            return instance;
        };

        for(const metaSymbol of metadataSymbols)
        {
            const targetMetadata = Reflect.get(target.prototype, metaSymbol);
            const sourceMetadata = Reflect.get(classDefinition.prototype, metaSymbol);

            if(!targetMetadata)
            {
                Reflect.set(target.prototype, metaSymbol, sourceMetadata);
            }
            else
            {
                extend(true, targetMetadata, sourceMetadata);
            }
        }

        // copy prototype so intanceof operator still works
        classMixin.prototype = original.prototype;

        return classMixin as any;
    };
}