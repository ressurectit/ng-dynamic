import {Inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {PermanentStorage, PERMANENT_STORAGE} from '@anglr/common';

/**
 * Name of store storing live events status
 */
const LIVE_EVENTS_STATUS = 'LIVE_EVENTS_STATUS';

/**
 * Service used for handling state of layout live events
 */
@Injectable()
export class LiveEventService
{
    //######################### protected fields #########################
    
    /**
     * Indication whether are live events enabled
     */
    protected ɵenabled: WritableSignal<boolean> = signal(false);
    
    //######################### public properties #########################
    
    /**
     * Gets indication whether are live events enabled
     */
    public get enabled(): Signal<boolean>
    {
        return this.ɵenabled.asReadonly();
    }

    //######################### constructor #########################
    constructor(@Inject(PERMANENT_STORAGE) protected storage: PermanentStorage,)
    {
        this.ɵenabled.set(this.storage.get<boolean|undefined>(LIVE_EVENTS_STATUS) ?? false);
    }
    
    //######################### public methods #########################
    
    /**
     * Sets enabled new value
     * @param enabled - Value of enabled that changed
     */
    public setEnabled(enabled: boolean): void
    {
        this.storage.set(LIVE_EVENTS_STATUS, enabled);
        this.ɵenabled.set(enabled);
    }
}