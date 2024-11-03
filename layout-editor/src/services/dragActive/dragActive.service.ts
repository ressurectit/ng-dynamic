import {Injectable, Signal, signal, WritableSignal} from '@angular/core';

/**
 * Service that holds information whether is currently drag active
 */
@Injectable()
export class DragActiveService
{
    //######################### protected fields #########################
    
    /**
     * Current dragging value
     */
    protected draggingSignal: WritableSignal<boolean> = signal(false);
    
    //######################### public properties #########################
    
    /**
     * Gets current dragging value
     */
    public get dragging(): Signal<boolean>
    {
        return this.draggingSignal.asReadonly();
    }
    
    //######################### public methods #########################
    
    /**
     * Sets dragging new value
     * @param dragging - Value of dragging that changed
     */
    public setDragging(dragging: boolean): void
    {
        this.draggingSignal.set(dragging);
    }
}