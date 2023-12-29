import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

import {GridColumnHeaderComponentOptions} from '../gridColumnHeader';
import {GridColumnContentComponentOptions} from '../gridColumnContent';

/**
 * Options for grid column component
 */
export interface GridColumnComponentOptions
{
    //######################### properties #########################

    /**
     * Contains content for grid column header
     */
    header: LayoutComponentMetadata<GridColumnHeaderComponentOptions>;

    /**
     * Contains content for grid column content
     */
    content: LayoutComponentMetadata<GridColumnContentComponentOptions>;

    /**
     * Width of column
     */
    width: string;
}