import {Dictionary, extend, globalDefine, isBlank, noop} from '@jscrpt/common';

declare const ngDesignerMetadata: boolean;

globalDefine(global =>
{
    if(isBlank(global.ngDesignerMetadata))
    {
        global.ngDesignerMetadata = true;
    }
});

//TODO: sideeffect

/**
 * Sets dynamic metadata to for property
 * @param value - Object with metadata to be stored
 * @param property - Property definition symbol
 */
export function DynamicPropertyMetadata<TValue = Dictionary>(value: TValue, property: symbol): PropertyDecorator
{
    if(ngDesignerMetadata)
    {
        return function (target: Object, propertyKey: string | symbol): void
        {
            const metadata = Reflect.get(target, property) as Dictionary<Dictionary> ?? {};
            const propertyMetadata = metadata[propertyKey as string] ??= {};
            
            extend(true, propertyMetadata, value);

            if(!Reflect.has(target, property))
            {
                Reflect.defineProperty(target,
                                       property,
                                       {
                                           value: metadata
                                       });
            }
        };
    }

    return noop;
}