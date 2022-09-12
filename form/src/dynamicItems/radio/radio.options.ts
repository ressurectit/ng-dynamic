import {FormComponentOptions} from '../../misc/formComponentBase.options';

/**
 * Options for radio component
 */
export interface RadioComponentOptions extends FormComponentOptions
{
    //######################### properties #########################
    
    /**
     * Radio options
     */
    options: string|undefined|null;
}