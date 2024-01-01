import {FeatureProviders} from '../../interfaces';
import {DynamicFeatureType} from '../enums';

/**
 * Core dynamic feature of specified type
 */
export class CoreDynamicFeature
{
    //######################### protected fields #########################

    /**
     * Dynamic feature type
     */
    protected ɵtype: DynamicFeatureType;

    /**
     * Available feature providers
     */
    protected featureProviders: FeatureProviders =
    {
        prependProviders: [],
        providers: [],
    };

    //######################### public properties #########################

    /**
     * Gets dynamic feature type
     */
    public get type(): DynamicFeatureType
    {
        return this.ɵtype;
    }

    //######################### constructor #########################
    constructor(type: DynamicFeatureType,
                featureProviders: FeatureProviders,
                ...using: CoreDynamicFeature[])
    {
        this.ɵtype = type;

        for(const use of using)
        {
            const useProviders = use.getProviders();

            this.featureProviders.prependProviders.push(...useProviders.prependProviders);
            this.featureProviders.providers.push(...useProviders.providers);
        }

        this.featureProviders.prependProviders.push(...featureProviders.prependProviders);
        this.featureProviders.providers.push(...featureProviders.providers);
    }

    //######################### public methods #########################

    /**
     * Gets providers for feature
     */
    public getProviders(): FeatureProviders
    {
        return this.featureProviders;
    }
}