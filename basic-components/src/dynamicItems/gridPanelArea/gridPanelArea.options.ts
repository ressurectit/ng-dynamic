import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

/**
 * Options for grid panel area component
 */
export interface GridPanelAreaComponentOptions
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