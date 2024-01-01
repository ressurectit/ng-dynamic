import {Provider} from '@angular/core';

import {CoreDynamicFeature} from './features/coreDynamic.feature';
import {DynamicFeature} from './features/dynamic.feature';
import {DynamicFeatureType} from './enums';

/**
 * Enables use of dynamic features in your application setting up all necessary providers
 * @param coreFeatures - Array of core dynamic features
 * @param features - Array of dynamic features
 */
export function provideDynamic(coreFeatures: CoreDynamicFeature[],
                               ...features: DynamicFeature[]): Provider[]
{
    const prependProviders: Provider[] = [];
    const providers: Provider[] = [];
    let type: DynamicFeatureType = 0;

    for(const coreFeature of coreFeatures)
    {
        type |= coreFeature.type;

        const featureProviders = coreFeature.getProviders();

        prependProviders.push(...featureProviders.prependProviders);
        providers.push(...featureProviders.providers);
    }

    for(const feature of features)
    {
        const featureProviders = feature.getProviders(type);

        prependProviders.push(...featureProviders.prependProviders);
        providers.push(...featureProviders.providers);
    }

    return [
        ...prependProviders,
        ...providers,
    ];
}