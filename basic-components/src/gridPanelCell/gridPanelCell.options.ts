import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

//TODO: aligning add

/**
 * Options for grid panel cell component
 */
export interface GridPanelCellComponentOptions
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
    component?: LayoutComponentMetadata;
}