import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

import {GridPanelCellComponentOptions} from '../gridPanelCell';

/**
 * Definition of grid panel column
 */
export interface GridPanelColumn
{
    /**
     * Width of column
     */
    width: string;
}

/**
 * Definition of grid panel row
 */
export interface GridPanelRow
{
    /**
     * Height of row
     */
    height: string;
}

/**
 * Options for grid panel component
 */
export interface GridPanelComponentOptions
{
    //######################### properties #########################

    /**
     * Definition of rows for this grid
     */
    rows: GridPanelRow[];

    /**
     * Definition of columns for this grid
     */
    columns: GridPanelColumn[];

    /**
     * Definition of grid cells content
     */
    cells: LayoutComponentMetadata<GridPanelCellComponentOptions>[];
}