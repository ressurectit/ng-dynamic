import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

import {GridColumnsComponentOptions} from '../gridColumns';
import {DataLoaderComponentOptions} from '../dataLoader';
import {PagingComponentOptions} from '../paging';
import {MetadataSelectorComponentOptions} from '../metadataSelector';

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
    paging: LayoutComponentMetadata<PagingComponentOptions>;

    /**
     * Holds data loader plugin type
     */
    dataLoader: LayoutComponentMetadata<DataLoaderComponentOptions>;

    /**
     * Holds metadata selector plugin type
     */
    metadataSelector: LayoutComponentMetadata<MetadataSelectorComponentOptions>;
}