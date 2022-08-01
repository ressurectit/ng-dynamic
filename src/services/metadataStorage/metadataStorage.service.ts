import {inject} from '@angular/core';
import {Func, PromiseOr} from '@jscrpt/common';
import {Observable, Subject} from 'rxjs';

import {MetadataStateManager} from '../../interfaces';
import {METADATA_STATE_MANAGER} from '../../misc/tokens';

/**
 * Class that represents abstract metadata storage
 */
export class MetadataStorage<TMetadata = any>
{
    //######################### protected properties #########################

    /**
     * Subject used for emitting when metadata that is being worked on have been saved
     */
    protected saveSubject: Subject<TMetadata> = new Subject<TMetadata>();

    /**
     * Instance of metadata state manager
     */
    protected metadataStateManger: MetadataStateManager<TMetadata> = inject(METADATA_STATE_MANAGER);

    //######################### public properties #########################

    /**
     * Occurs when metadata that is being worked on have been saved
     */
    public get save(): Observable<TMetadata>
    {
        return this.saveSubject.asObservable();
    }

    //######################### constructor #########################
    constructor(protected getMetadataFn: Func<PromiseOr<TMetadata|null>, [string]>,)
    {
    }

    //######################### public methods #########################

    /**
     * Saves current metadata into storage
     */
    public saveMetadata(): void
    {
        const metadata = this.metadataStateManger.getMetadata();

        if(metadata)
        {
            this.saveSubject.next(metadata);
        }
    }

    /**
     * Gets metadata from storage
     * @param id - Id of metadata to be obtained
     */
    public getMetadata(id: string): PromiseOr<TMetadata|null>
    {
        return this.getMetadataFn(id);
    }
}