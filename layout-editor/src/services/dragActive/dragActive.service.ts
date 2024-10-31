import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

//TODO: rework with signals

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
    protected ɵdragging: boolean = false;
    
    /**
     * Used for emitting dragging changes
     */
    protected ɵdraggingChange: Subject<void> = new Subject<void>();
    
    //######################### public properties #########################
    
    /**
     * Gets current dragging value
     */
    public get dragging(): boolean
    {
        return this.ɵdragging;
    }
    
    /**
     * Occurs when dragging changes
     */
    public get draggingChange(): Observable<void>
    {
        return this.ɵdraggingChange.asObservable();
    }
    
    //######################### public methods #########################
    
    /**
     * Sets dragging new value
     * @param dragging - Value of dragging that changed
     */
    public setDragging(dragging: boolean): void
    {
        if(this.ɵdragging == dragging)
        {
            return;
        }
    
        this.ɵdragging = dragging;
        this.ɵdraggingChange.next();
    }
}