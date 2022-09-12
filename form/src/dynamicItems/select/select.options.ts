import {FormFieldComponentOptions} from '../../misc/formFieldBase.options';

/**
 * Options for select component
 */
export interface SelectComponentOptions extends FormFieldComponentOptions
{
    //######################### properties #########################

    /**
     * Indication whether select allow multi selection
     */
    multiple: boolean|undefined|null;
}