import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

/**
 * Options for data table component
 */
export interface DataTableComponentOptions
{
    //######################### properties #########################

    /**
     * Holds columns definition
     */
    columns: LayoutComponentMetadata;

    /**
     * Holds paging type
     */
    paging: LayoutComponentMetadata;

    /**
     * Holds data loader type
     */
    dataLoader: LayoutComponentMetadata;
}