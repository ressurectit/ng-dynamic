import {Provider} from '@angular/core';

/**
 * Base class for layout relations features, this feature requires both layout and relations
 */
export abstract class LayoutRelationsFeature
{
    //######################### public properties #########################

    /**
     * Array of providers required for this feature to be enabled, these features must be prepended to the list of providers
     */
    public abstract get prependProviders(): Provider[];

    /**
     * Array of providers required for this feature to be enabled
     */
    public abstract get providers(): Provider[];
}