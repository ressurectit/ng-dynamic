import {FormComponentOptions} from '../../misc/formComponentBase.options';
import {RadioOption} from './radio.interface';

/**
 * Options for radio component
 */
export interface RadioComponentOptions extends FormComponentOptions
{
    //######################### properties #########################
    
    /**
     * Radio options
     */
    options: RadioOption[]|undefined|null;
}