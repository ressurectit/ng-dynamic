import {ComponentEndpointDef} from '../../interfaces';

/**
 * Type that is passed as parameter to configure node endpoint dialog
 */
export type ConfigureNodeEndpointData<TValue = any> = ComponentEndpointDef<TValue>&{noDefaultValue?: boolean; allowSkipInit?: boolean;};