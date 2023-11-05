import {FormFieldComponentOptions} from '../../misc/formFieldBase.options';

/**
 * Options for number field component
 */
export interface NumberFieldComponentOptions extends FormFieldComponentOptions
{
    //######################### properties #########################

    /**
     * Min number value
     */
    min: number|undefined|null;

    /**
     * Max number value
     */
    max: number|undefined|null;

    /**
     * Number of decimal places
     */
    decimalPlaces: number|undefined|null;
}