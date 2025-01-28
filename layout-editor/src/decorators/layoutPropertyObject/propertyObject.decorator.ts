import {Type} from '@angular/core';
import {DynamicPropertyMetadata} from '@anglr/dynamic';
import {extend} from '@jscrpt/common/extend';

import {LayoutPropertyMetadata} from '../../misc/types';
import {LayoutPropertyObjectData} from './propertyObject.interface';

/**
 * Adds object metadata to component property for designer
 * @param type - Type containing metadata for nested object
 * @param metadataSymbols - Array of symbols that are storing metadata
 */
export function LayoutPropertyObject(type: Type<any>, metadataSymbols: symbol[]): PropertyDecorator
{
    const objMetadata = {};

    for(const metaSymbol of metadataSymbols)
    {
        const typeMetadata = Reflect.get(type.prototype, metaSymbol);

        extend(true, objMetadata, typeMetadata);
    }

    return DynamicPropertyMetadata<LayoutPropertyObjectData>({object: objMetadata}, LayoutPropertyMetadata);
}