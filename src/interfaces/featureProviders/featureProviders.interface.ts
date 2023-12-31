import {Provider} from '@angular/core';

/**
 * Definies feature providers
 */
export interface FeatureProviders
{
    /**
     * Array of providers required for this feature to be enabled, these features must be prepended to the list of providers
     */
    readonly prependProviders: Provider[];

    /**
     * Array of providers required for this feature to be enabled
     */
    readonly providers: Provider[];
}