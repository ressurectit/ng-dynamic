import {Inject, Injectable} from '@angular/core';
import {isBlank} from '@jscrpt/common';
import {Observable, Subject} from 'rxjs';

import {MetadataStateManager} from '../../interfaces';
import {METADATA_STATE_MANAGER} from '../../misc/tokens';

/**
 * Maximum number of items in history
 */
const MAX_ITEMS = 200;

/**
 * Service used for managing state of metadata
 */
@Injectable()
export class MetadataHistoryManager<TMetadata = any>
{
    //######################### protected properties #########################

    /**
     * Current index which is active currently
     */
    protected activeIndex: number|null = null;

    /**
     * Index of state which is saved
     */
    protected saveIndex: number|null = null;

    /**
     * All stored states
     */
    protected states: TMetadata[] = [];

    /**
     * Indication whether is manager enabled
     */
    protected enabled: boolean = true;

    /**
     * Used for emitting pop event
     */
    protected popSubject: Subject<TMetadata> = new Subject<TMetadata>();

    /**
     * Used for emitting history change event
     */
    protected historyChangeSubject: Subject<void> = new Subject<void>();

    //######################### public properties #########################

    /**
     * Information whether user can undo
     */
    public get canUndo(): boolean
    {
        if(isBlank(this.activeIndex))
        {
            return false;
        }

        return this.activeIndex > 0;
    }

    /**
     * Information whether user can redo
     */
    public get canRedo(): boolean
    {
        if(isBlank(this.activeIndex))
        {
            return false;
        }

        return this.activeIndex + 1 < this.states.length;
    }

    /**
     * Indication whether current state is saved state
     */
    public get saved(): boolean
    {
        return this.activeIndex === this.saveIndex;
    }

    /**
     * Occurs when user pops new state, using undo, or redo
     */
    public get pop(): Observable<TMetadata>
    {
        return this.popSubject.asObservable();
    }

    /**
     * Occurs when new state appears in history
     */
    public get historyChange(): Observable<void>
    {
        return this.historyChangeSubject.asObservable();
    }

    /**
     * Current state of metadata
     */
    public get state(): TMetadata|null
    {
        if(isBlank(this.activeIndex))
        {
            return null;
        }

        return this.states[this.activeIndex];
    }

    //######################### constructor #########################
    constructor(@Inject(METADATA_STATE_MANAGER) protected metadataState: MetadataStateManager<TMetadata>,)
    {
    }

    //######################### public methods #########################
    
    /**
     * Undo last change in metadata
     */
    public undo(): void
    {
        if(!this.canUndo || !this.activeIndex)
        {
            return;
        }

        this.activeIndex--;
        this.popSubject.next(this.states[this.activeIndex]);
    }

    /**
     * Redo last change in metadata
     */
    public redo(): void
    {
        if(!this.canRedo || !this.activeIndex)
        {
            return;
        }

        this.activeIndex++;
        this.popSubject.next(this.states[this.activeIndex]);
    }

    /**
     * Indicates that new change in state has been done and should be retrieved
     */
    public getNewState(): void
    {
        if(!this.enabled)
        {
            return;
        }

        //max number of states reached
        if(this.states.length >= MAX_ITEMS)
        {
            this.states.shift();
        }

        //getting new state, where current index is not at the end, rewriting history for redo
        if(this.activeIndex && this.activeIndex + 1 < this.states.length)
        {
            this.states.splice(this.activeIndex + 1, this.states.length - (this.activeIndex + 1));
        }

        const state = this.metadataState.getMetadata();

        //only for existing state
        if(state)
        {
            this.states.push(JSON.parse(JSON.stringify(state)));
            this.activeIndex = this.states.length - 1;
            this.historyChangeSubject.next();
        }
    }

    /**
     * Sets current state as saved state
     */
    public save(): void
    {
        this.saveIndex = this.activeIndex;
    }

    public setInitialState(metadata: TMetadata): void
    {
        this.states.push(JSON.parse(JSON.stringify(metadata)));
        this.activeIndex = this.states.length - 1;
        this.save();
    }

    /**
     * Cleans history of metadata states
     */
    public clean(): void
    {
        this.activeIndex = null;
        this.saveIndex = null;
        this.states = [];
    }

    /**
     * Enable metadata history manager, changes in metadata are stored
     */
    public enable(): void
    {
        this.enabled = true;
    }

    /**
     * Disables metadata history manager, changes in metadata history are not stored
     */
    public disable(): void
    {
        this.enabled = false;
    }
}