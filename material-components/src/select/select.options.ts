import {MaterialFormFieldComponentOptions} from '../misc';

/**
 * Options for material select component
 */
export interface MaterialSelectComponentOptions extends MaterialFormFieldComponentOptions
{
    //######################### properties #########################

    /**
     * Indication whether select allow multi selection
     */
    multiple: boolean|undefined|null;
}