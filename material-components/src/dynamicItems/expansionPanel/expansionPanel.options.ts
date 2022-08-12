import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

/**
 * Options for material expansion panel component
 */
export interface MaterialExpansionPanelComponentOptions
{
    //######################### properties #########################

    /**
     * Array of children that are going to be rendered
     */
    children: LayoutComponentMetadata[]|undefined|null;

    /**
     * Indication whether panel is expanded
     */
    expanded: boolean|undefined|null;

    /**
     * Panel title
     */
    title: string|undefined|null;

    /**
     * Panel description
     */
    description: string|undefined|null;
}