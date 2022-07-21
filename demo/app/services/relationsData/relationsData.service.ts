import {Inject, Injectable} from '@angular/core';
import {PermanentStorage, PERMANENT_STORAGE} from '@anglr/common';
import {RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {Dictionary} from '@jscrpt/common';

const DATA = 'RELATIONS_DATA';

/**
 * Service used for obtaining and storing relations data
 */
@Injectable({providedIn: 'root'})
export class RelationsDataService
{
    //######################### constructor #########################
    constructor(@Inject(PERMANENT_STORAGE) private _storage: PermanentStorage,)
    {
    }

    //######################### public methods #########################

    public setData(name: string, data: RelationsNodeMetadata[]): void
    {
        const store: Dictionary<RelationsNodeMetadata[]> = this._storage.get(DATA) ?? {};

        store[name] = data;

        this._storage.set(DATA, store);
    }

    public getData(name: string): RelationsNodeMetadata[]|null
    {
        return (this._storage.get(DATA)?.[name]) ?? null;
    }

    public removeData(name: string): void
    {
        const store: Dictionary<RelationsNodeMetadata[]> = this._storage.get(DATA) ?? {};

        delete store[name];

        this._storage.set(DATA, store);
    }

    public getStored(): string[]
    {
        const store: Dictionary<RelationsNodeMetadata[]> = this._storage.get(DATA) ?? {};

        return Object.keys(store);
    }
}