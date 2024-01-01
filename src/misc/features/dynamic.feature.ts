import {FeatureProviders, TypedFeatureProviders} from '../../interfaces';
import {DynamicFeatureType} from '../enums';

/**
 * Dynamic feature provider for enabling dynamic features
 */
export class DynamicFeature
{
    //######################### protected fields #########################

    /**
     * Available feature providers
     */
    protected featureProviders: TypedFeatureProviders;

    //######################### constructor #########################
    constructor(featureProviders: TypedFeatureProviders)
    {
        this.featureProviders = featureProviders;
    }

    //######################### public methods #########################

    /**
     * Gets providers according provided core features
     * @param type - Type of currently enabled core features
     */
    public getProviders(type: DynamicFeatureType): FeatureProviders
    {
        const providers: FeatureProviders =
        {
            prependProviders: [],
            providers: [],
        };

        //add providers for layout runtime
        if((type & DynamicFeatureType.LayoutRuntime) == DynamicFeatureType.LayoutRuntime)
        {
            providers.prependProviders.push(...this.featureProviders.layoutRuntime.prependProviders);
            providers.providers.push(...this.featureProviders.layoutRuntime.providers);
        }

        //add providers for layout editor
        if((type & DynamicFeatureType.LayoutRuntime) == DynamicFeatureType.LayoutRuntime &&
           (type & DynamicFeatureType.LayoutEditor) == DynamicFeatureType.LayoutEditor)
        {
            providers.prependProviders.push(...this.featureProviders.layoutEditor.prependProviders);
            providers.providers.push(...this.featureProviders.layoutEditor.providers);
        }

        //add providers for relations runtime
        if((type & DynamicFeatureType.RelationsRuntime) == DynamicFeatureType.RelationsRuntime)
        {
            providers.prependProviders.push(...this.featureProviders.relationsRuntime.prependProviders);
            providers.providers.push(...this.featureProviders.relationsRuntime.providers);
        }

        //add providers for relations editor
        if((type & DynamicFeatureType.RelationsEditor) == DynamicFeatureType.RelationsEditor)
        {
            providers.prependProviders.push(...this.featureProviders.relationsEditor.prependProviders);
            providers.providers.push(...this.featureProviders.relationsEditor.providers);
        }

        return providers;
    }
}