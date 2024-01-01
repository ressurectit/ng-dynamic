import {Provider} from '@angular/core';

/**
 * Defines feature providers
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

/**
 * Defines feature providers by specific type
 */
export interface TypedFeatureProviders
{
    /**
     * Providers for layout runtime
     */
    readonly layoutRuntime: FeatureProviders;

    /**
     * Providers for relations runtime
     */
    readonly relationsRuntime: FeatureProviders;

    /**
     * Providers for layout editor
     */
    readonly layoutEditor: FeatureProviders;

    /**
     * Providers for relations editor
     */
    readonly relationsEditor: FeatureProviders;
}