import {ComponentEndpointDef} from '../../interfaces';

/**
 * Options for component output relations
 */
export interface ComponentOutputsRelationsOptions
{
    /**
     * Array of component output definitions
     */
    outputs: ComponentEndpointDef[]|undefined|null;
}