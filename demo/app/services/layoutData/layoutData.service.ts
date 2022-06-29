import {Inject, Injectable} from '@angular/core';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {PermanentStorage, PERMANENT_STORAGE} from '@anglr/common';
import {Dictionary} from '@jscrpt/common';

const DATA = 'LAYOUT_DATA';

/**
 * Service used for obtaining and storing layout data
 */
@Injectable({providedIn: 'root'})
export class LayoutDataService
{
    //######################### constructor #########################
    constructor(@Inject(PERMANENT_STORAGE) private _storage: PermanentStorage,)
    {
    }

    //######################### public methods #########################

    public setLayoutData(name: string, data: LayoutComponentMetadata): void
    {
        const store: Dictionary<LayoutComponentMetadata> = this._storage.get(DATA) ?? {};

        store[name] = data;

        this._storage.set(DATA, store);
    }

    public getLayoutData(name: string): LayoutComponentMetadata|null
    {
        return (this._storage.get(DATA)?.[name]) ?? null;
    }

    public removeLayoutData(name: string): void
    {
        const store: Dictionary<LayoutComponentMetadata> = this._storage.get(DATA) ?? {};

        delete store[name];

        this._storage.set(DATA, store);
    }

    public getStoredLayouts(): string[]
    {
        const store: Dictionary<LayoutComponentMetadata> = this._storage.get(DATA) ?? {};

        return Object.keys(store);
    }
}