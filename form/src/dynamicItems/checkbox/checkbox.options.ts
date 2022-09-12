import {FormComponentOptions} from '../../misc/formComponentBase.options';

/**
 * Options for  checkbox component
 */
export interface CheckboxComponentOptions extends FormComponentOptions
{
    //######################### properties #########################
    
    /**
     * Input label
     */
    label: string|undefined|null;
}