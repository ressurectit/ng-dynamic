import {Inject, Injectable} from '@angular/core';
import {PermanentStorage, PERMANENT_STORAGE} from '@anglr/common';
import {Observable, Subject} from 'rxjs';

const LIVE_EVENTS_STATUS = 'LIVE_EVENTS_STATUS';

/**
 * Service used for handling state of layout live events
 */
@Injectable()
export class LiveEventService
{
    //######################### protected fields #########################
    
    /**
     * Current enabled value
     */
    protected ɵenabled: boolean = false;
    
    /**
     * Used for emitting enabled changes
     */
    protected ɵenabledChange: Subject<void> = new Subject<void>();
    
    //######################### public properties #########################
    
    /**
     * Gets current enabled value
     */
    public get enabled(): boolean
    {
        return this.ɵenabled;
    }
    
    /**
     * Occurs when enabled changes
     */
    public get enabledChange(): Observable<void>
    {
        return this.ɵenabledChange.asObservable();
    }

    //######################### constructor #########################
    constructor(@Inject(PERMANENT_STORAGE) protected storage: PermanentStorage,)
    {
        this.ɵenabled = this.storage.get<boolean|undefined>(LIVE_EVENTS_STATUS) ?? false;
    }
    
    //######################### public methods #########################
    
    /**
     * Sets enabled new value
     * @param enabled - Value of enabled that changed
     */
    public setEnabled(enabled: boolean): void
    {
        if(this.ɵenabled == enabled)
        {
            return;
        }
    
        this.storage.set(LIVE_EVENTS_STATUS, enabled);

        this.ɵenabled = enabled;
        this.ɵenabledChange.next();
    }
}