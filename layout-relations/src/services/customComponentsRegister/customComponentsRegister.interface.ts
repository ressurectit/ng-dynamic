import {Dictionary} from '@jscrpt/common';

/**
 * Configuration for custom components
 */
export interface CustomComponentConfiguration
{
    /**
     * Definition of components and their properties
     */
    configurableComponents?: Dictionary<string[]>;

    /**
     * Display name of custom component
     */
    displayName?: string;
}