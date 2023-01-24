import {ComponentEndpointDef} from '@anglr/dynamic/layout-relations';

/**
 * Options for trigger relations
 */
export interface TriggerRelationsOptions
{
    /**
     * Array of dynamic endpoint definitions
     */
    endpoints: ComponentEndpointDef[]|undefined|null;
}