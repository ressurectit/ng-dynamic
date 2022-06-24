import {DynamicPropertyMetadata} from '@anglr/dynamic';

import {LayoutPropertyMetadata} from '../../misc/types';
import {LayoutPropertyDescriptionData} from './propertyDescription.interface';

/**
 * Adds description to component property for designer
 * @param description - Description of property
 */
export function LayoutPropertyDescription(description: string): PropertyDecorator
{
    return DynamicPropertyMetadata<LayoutPropertyDescriptionData>({description}, LayoutPropertyMetadata);
}