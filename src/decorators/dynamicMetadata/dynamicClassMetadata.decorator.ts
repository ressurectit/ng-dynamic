import {DynamicMetadataLoader} from './dynamicMetadata.interface';

declare let ngDesignerMetadata: boolean;

//TODO: rework also with symbol

/**
 * Sets dynamic metadata to class on which is this decorator applied
 * @param metadataLoader - Metadata loader function used for obtaining metadata
 * @param propertyName - Name of property where will be metadata instance stored
 */
export function DynamicClassMetadata<TMetadata, TDecoratedClass>(metadataLoader: DynamicMetadataLoader<TMetadata>, propertyName: keyof TDecoratedClass): ClassDecorator
{
    if(ngDesignerMetadata)
    {
        return function <TFunction extends Function> (target: TFunction): TFunction
        {
            (target as any)[propertyName] = metadataLoader();

            return target;
        };
    }

    return function <TFunction extends Function> (target: TFunction): TFunction
    {
        return target;
    };
}