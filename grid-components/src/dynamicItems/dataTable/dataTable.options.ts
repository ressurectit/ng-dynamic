import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

import {GridColumnsComponentOptions} from '../gridColumns';
import {DataLoaderComponentOptions} from '../dataLoader';

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
     * Holds data loader plugin type
     */
    dataLoader: LayoutComponentMetadata<DataLoaderComponentOptions>;
}