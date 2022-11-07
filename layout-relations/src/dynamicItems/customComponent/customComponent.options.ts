import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Dictionary} from '@jscrpt/common';

/**
 * Options for custom component component
 */
export interface CustomComponentComponentOptions
{
    /**
     * Name of custom component, used for obtaining metadata
     */
    name: string;

    /**
     * Represents layout metadata for all placeholders used within custom component
     */
    placeholderContainers: Dictionary<LayoutComponentMetadata>|undefined|null;

    /**
     * Static options for content components
     */
    contentOptions: Dictionary<unknown>;

    /**
     * Represents components that have custom options and what properties are set
     */
    usedComponents: Dictionary<string[]>;
}

/**
 * Options for custom component relations
 */
export interface CustomComponentRelationsOptions
{
    /**
     * Name of custom component, used for obtaining metadata
     */
    name: string;
}