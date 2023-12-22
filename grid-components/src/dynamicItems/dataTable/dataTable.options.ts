import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

import {GridColumnsComponentOptions} from '../gridColumns';

/**
 * Options for data table component
 */
export interface DataTableComponentOptions
{
    //######################### properties #########################

    /**
     * Holds columns definition
     */
    columns: LayoutComponentMetadata<GridColumnsComponentOptions>;

    /**
     * Holds paging type
     */
    paging: LayoutComponentMetadata;

    /**
     * Holds data loader type
     */
    dataLoader: LayoutComponentMetadata;
}