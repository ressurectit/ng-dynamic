import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {RelationsComponentMetadata} from '../../interfaces';

/**
 * Manager of relations metadata
 */
@Injectable()
export class RelationsManager
{
    //######################### protected fields #########################
    
    /**
     * Current relations value
     */
    protected _relations: RelationsComponentMetadata[] = [];
    
    /**
     * Used for emitting relations changes
     */
    protected _relationsChange: Subject<void> = new Subject<void>();
    
    //######################### public properties #########################
    
    /**
     * Gets current relations value
     */
    public get relations(): RelationsComponentMetadata[]
    {
        return this._relations;
    }
    
    /**
     * Occurs when relations changes
     */
    public get relationsChange(): Observable<void>
    {
        return this._relationsChange.asObservable();
    }
    
    //######################### public methods #########################
    
    /**
     * Sets relations new value
     * @param relations - Value of relations that changed
     */
    public setRelations(relations: RelationsComponentMetadata[]): void
    {
        if(this._relations == relations)
        {
            return;
        }
    
        this._relations = relations;
        this._relationsChange.next();
    }
}