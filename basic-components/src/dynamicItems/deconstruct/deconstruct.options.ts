import {ComponentEndpointDef} from '@anglr/dynamic/layout-relations';

/**
 * Options for deconstruct relations
 */
export interface DeconstructRelationsOptions<TValue = unknown>
{
    /**
     * Array of properties that are extracted from object
     */
    properties: ComponentEndpointDef<TValue>[];
}
