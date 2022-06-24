import {Dictionary, extend, noop} from '@jscrpt/common';

declare let ngDesignerMetadata: boolean;

/**
 * Sets dynamic metadata to for property
 * @param metadata - Object with metadata to be stored
 * @param propertyName - Property definition symbol
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

            Reflect.set(target, property, metadata);
        };
    }

    return noop;
}