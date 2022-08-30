/**
 * Definition of component endpoint
 */
export interface ComponentEndpointDef<TValue = any>
{
    /**
     * Name of component endpoint
     */
    name: string;

    /**
     * Default value for endpoint, if not connected
     */
    defaultValue: TValue|undefined|null;
}