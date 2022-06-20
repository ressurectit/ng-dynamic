import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

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
 * Definition of grid panel cell content
 */
export interface GridPanelCellContent
{
    /**
     * Coordinate of grid row start
     */
    gridRowStart: number;

    /**
     * Coordinate of grid row end
     */
    gridRowEnd: number;

    /**
     * Coordinate of grid column start
     */
    gridColumnStart: number;

    /**
     * Coordinate of grid column end
     */
    gridColumnEnd: number;

    /**
     * Id of compnent in this cell
     */
    componentId: string;
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
    cellsContent: GridPanelCellContent[];

    /**
     * Array of children that are going to be rendered
     */
    children: LayoutComponentMetadata[];
}