import {Dictionary} from '@jscrpt/common';

/**
 * Configuration for custom components
 */
export interface CustomComponentConfiguration
{
    /**
     * Definition of properties for components and models which are configurable
     */
    configurableProperties?: Dictionary<Dictionary<string[]>>;

    /**
     * Display name of custom component
     */
    displayName?: string;

    /**
     * Description for custom component
     */
    description?: string;
}