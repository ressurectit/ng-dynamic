import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

/**
 * Options for stack panel component
 */
export interface StackPanelComponentOptions
{
    //######################### properties #########################

    /**
     * Indication whether display stacked elements horizontally
     */
    horizontal?: boolean;

    /**
     * Indication whether wrap children if there is not enough space
     */
    wrap?: boolean;

    /**
     * Array of children that are going to be rendered
     */
    children: LayoutComponentMetadata[];
}