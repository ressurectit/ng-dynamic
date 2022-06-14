import {InjectionToken} from "@angular/core";

import {NodeDefinitions} from "../interfaces";

/**
 * Injection token used for injecting dynamic node loaders used for loading node definitions
 */
export const DYNAMIC_NODE_LOADERS: InjectionToken<DynamicNodeLoader[]> = new InjectionToken<DynamicNodeLoader[]>('DYNAMIC_NODE_LOADERS');

/**
 * Dynamic node loader description used for dynamic loading of node definitions
 */
export interface DynamicNodeLoader
{
    /**
     * Tries to load node definitions, source is specified by this loader
     */
    tryLoadNodeDefinitions(): Promise<NodeDefinitions>;
}