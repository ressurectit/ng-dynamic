import {LayoutComponentDragData} from '../../../../interfaces';

/**
 * Defines data that are set as drop result
 */
export interface LayoutDropResult
{
    /**
     * Id of component where should be new descendant added
     */
    id: string;

    /**
     * Index at which should be new descendant added
     */
    index: number;
}

/**
 * Defines drag item data
 */
export interface LayoutDragItem
{
    /**
     * Data that are dragged
     */
    dragData: LayoutComponentDragData;
}

/**
 * Defines 
 */
export interface LayoutDragPlaceholder
{
    width: number;
    height: number;
    
}