import {ClassProvider} from "@angular/core";

import {DynamicNodeLoader, DYNAMIC_NODE_LOADERS} from "./dynamicNodeLoader.interface";
import {NodeDefinitions} from "../interfaces";

/**
 * Default NgDynamic DynamicNodeLoader
 */
export class NgDynamicNodeLoader implements DynamicNodeLoader
{
    /**
     * Tries to load node definitions, source is specified by this loader
     */
    public async tryLoadNodeDefinitions(): Promise<NodeDefinitions>
    {
        let nodeDefinitions: NodeDefinitions = (await import('@anglr/' + 'dynamic/nodes')
            .catch(error =>
            {
                throw new Error(`Unable to load dynamic nodes definitions, missing @anglr/dynamic/nodes, error '${error}'.`);
            })).nodeDefinitions;

        return nodeDefinitions;
    }
}

/**
 * Default provider for DynamicNodeLoader
 */
export const DYNAMIC_NODE_LOADERS_PROVIDER: ClassProvider =
{
    provide: DYNAMIC_NODE_LOADERS,
    useClass: NgDynamicNodeLoader,
    multi: true
};