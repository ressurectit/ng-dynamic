import {DynamicPropertyMetadata} from '@anglr/dynamic';

import {LayoutPropertyMetadata} from '../../misc/types';
import {LayoutPropertyTypeData} from './propertyType.interface';

/**
 * Adds type to component property for designer
 * @param type - Type of property
 */
export function LayoutPropertyType<TType extends string>(type: TType): PropertyDecorator
{
    return DynamicPropertyMetadata<LayoutPropertyTypeData>({type}, LayoutPropertyMetadata);
}