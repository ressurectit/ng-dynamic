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