import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

import {GridColumnComponentOptions} from '../gridColumn';

/**
 * Options for grid columns component
 */
export interface GridColumnsComponentOptions
{
    //######################### properties #########################

    /**
     * Array of columns definitions
     */
    columns: LayoutComponentMetadata<GridColumnComponentOptions>[];
}