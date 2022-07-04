
import {LayoutPropertyDescriptionData, LayoutPropertyNameData, LayoutPropertyValuesData} from '../decorators';

/**
 * Default built-in property types
 */
export type DefaultKnownPropertyTypes = 'textarea'|'inputString'|'inputNumber'|'inputSize'|'inputBoolean'|'selectValue'|'selectValues';

/**
 * Minimal layout editor property metadata
 */
export type LayoutEditorPropertyMetadata<TValues = any> = LayoutPropertyDescriptionData&LayoutPropertyNameData&LayoutPropertyValuesData<TValues>;

/**
 * Symbol defining property storing layout properties metadata
 */
export const LayoutPropertyMetadata = Symbol('LayoutPropertyMetadata');
