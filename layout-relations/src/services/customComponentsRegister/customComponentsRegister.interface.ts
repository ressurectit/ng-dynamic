import {Dictionary} from '@jscrpt/common';

import {CustomDynamicItemConfiguration} from '../customDynamicItemsRegister/customDynamicItemsRegister.interface';

/**
 * Configuration for custom components
 */
export interface CustomComponentConfiguration extends CustomDynamicItemConfiguration
{
    /**
     * Definition of properties for components and models which are configurable
     */
    configurableProperties?: Dictionary<Dictionary<string[]>>;
}