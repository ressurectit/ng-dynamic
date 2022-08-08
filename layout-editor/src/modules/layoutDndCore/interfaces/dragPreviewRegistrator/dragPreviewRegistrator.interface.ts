import {Subscription} from 'rxjs';

/**
 * Class that represents registrator for drag preview
 */
export interface DragPreviewRegistrator
{
    /**
     * Registers element as drag sources drag preview
     * @param element - Element to be registered as drag preview
     */
    registerPreviewElement(element: HTMLElement): Subscription;
}