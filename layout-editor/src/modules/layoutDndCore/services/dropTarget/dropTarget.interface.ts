import {LayoutComponentDragData} from '../../../../interfaces';

/**
 * Data that occured after drag ended
 */
export interface DropTargetData
{
    /**
     * Id of component that should handle drop data
     */
    id: string;

    /**
     * Data to be passed to component
     */
    data: LayoutComponentDragData;
}