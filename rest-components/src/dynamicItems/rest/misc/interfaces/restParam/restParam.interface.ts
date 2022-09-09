import {ParamType} from '../../types';

/**
 * Definition of rest parameter
 */
export interface RestParam<TValue = unknown>
{
    /**
     * Type of parameter
     */
    type: ParamType;

    /**
     * Indication whether this rest parameter can be configured using relations
     */
    configurable: boolean;

    /**
     * Value of parameter
     */
    value: TValue;

    /**
     * Name of parameter
     */
    name: string|undefined|null;
}