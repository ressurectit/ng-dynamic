import {Injectable} from '@angular/core';
import {MetadataHistoryManager} from '@anglr/dynamic';

/**
 * Special verson of metadata history manager for relations debugging
 */
@Injectable()
export class MetadataHistoryManagerDebug<TMetadata = unknown> extends MetadataHistoryManager<TMetadata>
{
    //######################### constructor #########################
    constructor()
    {
        super(null!);
    }

    //######################### public methods #########################

    /**
     * Undo last change in metadata
     */
    public override undo(): void
    {
    }

    /**
     * Redo last change in metadata
     */
    public override redo(): void
    {
    }

    /**
     * Indicates that new change in state has been done and should be retrieved
     */
    public override getNewState(): void
    {
    }

    /**
     * Sets current state as saved state
     */
    public override save(): void
    {
    }

    public override setInitialState(_metadata: TMetadata): void
    {
    }

    /**
     * Cleans history of metadata states
     */
    public override clean(): void
    {
    }

    /**
     * Enable metadata history manager, changes in metadata are stored
     */
    public override enable(): void
    {
    }

    /**
     * Disables metadata history manager, changes in metadata history are not stored
     */
    public override disable(): void
    {
    }
}