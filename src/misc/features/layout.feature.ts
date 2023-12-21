import {Provider} from '@angular/core';

/**
 * Base class for layout features, this featuer requires layout
 */
export abstract class LayoutFeature
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