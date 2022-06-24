import {DynamicPropertyMetadata} from '@anglr/dynamic';

import {LayoutPropertyMetadata} from '../../misc/types';
import {LayoutPropertyNameData} from './propertyName.interface';

/**
 * Adds display name to component property for designer
 * @param name - Display name of property
 */
export function LayoutPropertyName(name: string): PropertyDecorator
{
    return DynamicPropertyMetadata<LayoutPropertyNameData>({name}, LayoutPropertyMetadata);
}