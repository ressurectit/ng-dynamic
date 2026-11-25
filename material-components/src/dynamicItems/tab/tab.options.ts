import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

/**
 * Options for material tab component
 */
export interface MaterialTabComponentOptions
{
    //######################### properties #########################

    /**
     * Array of children that are going to be rendered
     */
    children: LayoutComponentMetadata[]|undefined|null;
}