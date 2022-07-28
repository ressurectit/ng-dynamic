import {FormComponentOptions} from '@anglr/dynamic/form';

/**
 * Options for material radio component
 */
export interface MaterialRadioComponentOptions extends FormComponentOptions
{
    //######################### properties #########################
    
    /**
     * Radio options
     */
    options: string|undefined|null;
}