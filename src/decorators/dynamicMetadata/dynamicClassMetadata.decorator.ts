import {DynamicMetadataCtor} from './dynamicMetadata.interface';

declare let ngDesignerMetadata: boolean;

/**
 * Sets dynamic metadata to class on which is this decorator applied
 * @param metadata - Metadata type to be created by decorator
 * @param propertyName - Name of property where will be metadata instance stored
 */
export function DynamicClassMetadata<TMetadata, TDecoratedClass>(metadata: DynamicMetadataCtor<TMetadata>, propertyName: keyof TDecoratedClass): ClassDecorator
{
    if(ngDesignerMetadata)
    {
        return function <TFunction extends Function> (target: TFunction): TFunction
        {
            (target as any)[propertyName] = new metadata();

            return target;
        };
    }

    return function <TFunction extends Function> (target: TFunction): TFunction
    {
        return target;
    };
}