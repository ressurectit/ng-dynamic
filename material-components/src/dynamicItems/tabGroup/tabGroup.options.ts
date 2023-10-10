import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

/**
 * Definition of grid panel column
 */
export interface Tab
{
    /**
     * Tab title
     */
    title: string;

    /**
     * Metadata for component displayed as content of if block
     */
    content: LayoutComponentMetadata|undefined|null;
}

/**
 * Options for material tab group component
 */
export interface MaterialTabGroupComponentOptions
{
    //######################### properties #########################

    /**
     * Array of tabs
     */
    tabs: Tab[]|undefined|null;
}