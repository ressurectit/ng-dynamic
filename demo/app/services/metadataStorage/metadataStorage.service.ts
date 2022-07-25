import {Inject, Injectable} from '@angular/core';
import {MetadataStorage, METADATA_HISTORY_MANAGER_GET_STATE} from '@anglr/dynamic';
import {Func, PromiseOr} from '@jscrpt/common';

import {StoreDataService} from '../storeData';

/**
 * Demo storage for storing metadata
 */
@Injectable()
export class DemoStorage<TMetadata = any> extends MetadataStorage
{
    //######################### private fields #########################

    /**
     * Name of metadata that is being worked on
     */
    private _name: string|null = null;

    //######################### constructor #########################
    constructor(private _store: StoreDataService<TMetadata>,
                @Inject(METADATA_HISTORY_MANAGER_GET_STATE) private _getMetadata: Func<TMetadata>,)
    {
        super();
    }

    //######################### public methods #########################

    /**
     * @inheritdoc
     */
    public override save(): PromiseOr<void>
    {
        if(!this._name)
        {
            return;
        }

        this._store.setData(this._name, this._getMetadata());
    }

    /**
     * Sets name of metadata to be used
     * @param name - Name of metadata that is being worked on
     */
    public setName(name: string|null): void
    {
        this._name = name;
    }
}