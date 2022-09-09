import {RestParam} from '../../interfaces';

/**
 * Data for configure rest parameter dialog
 */
export interface ConfigureRestParameterData
{
    /**
     * Parameter that being configured
     */
    parameter: RestParam;

    /**
     * Indication whether body parameter is already present
     */
    hasBody: boolean;
}