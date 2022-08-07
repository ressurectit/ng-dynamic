import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {DropTargetData} from './dropTarget.interface';

/**
 * Service that handles transporting metadata to correct drop target
 */
@Injectable()
export class DropTargetService
{
    //######################### protected fields #########################
    
    /**
     * Used for emitting data changes
     */
    protected dataChangeSubject: Subject<DropTargetData> = new Subject<DropTargetData>();
    
    //######################### public properties #########################
    
    /**
     * Occurs when data changes
     */
    public get dataChange(): Observable<DropTargetData>
    {
        return this.dataChangeSubject.asObservable();
    }
    
    //######################### public methods #########################
    
    /**
     * Sets data new value
     * @param data - Value of data that changed
     */
    public setData(data: DropTargetData): void
    {
        this.dataChangeSubject.next(data);
    }
}