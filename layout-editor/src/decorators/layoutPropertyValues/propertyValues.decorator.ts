import {DynamicPropertyMetadata} from '@anglr/dynamic';

import {LayoutPropertyMetadata} from '../../misc/types';
import {LayoutPropertyValuesData} from './propertyValues.interface';

/**
 * Adds available values to component property for designer
 * @param values - Array of available values
 */
export function LayoutPropertyValues<TType>(values: Array<TType>): PropertyDecorator
{
    return DynamicPropertyMetadata<LayoutPropertyValuesData>({values}, LayoutPropertyMetadata);
}