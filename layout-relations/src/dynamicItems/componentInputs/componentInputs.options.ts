import {ComponentEndpointDef} from '../../interfaces';

/**
 * Options for component inputs relations
 */
export interface ComponentInputsRelationsOptions
{
    /**
     * Array of component input definitions
     */
    inputs: ComponentEndpointDef[]|undefined|null;
}