import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

import {GridColumnComponentOptions} from '../gridColumn';

/**
 * Options for data grid columns
 */
export interface GridColumnsComponentOptions
{
    //######################### properties #########################

    /**
     * Array of columns definitions
     */
    columns: LayoutComponentMetadata<GridColumnComponentOptions>[];
}