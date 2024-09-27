import {PermanentStorage} from '@anglr/common';
import {Dictionary} from '@jscrpt/common';

/**
 * Service used for obtaining and storing data
 */
export class StoreDataService<TData = unknown>
{
    //######################### constructor #########################
    constructor(private _storage: PermanentStorage,
                private _storeKey: string,)
    {
    }

    //######################### public methods #########################

    /**
     * Stores data into store
     * @param name - Name of stored data
     * @param data - Data to be stored
     */
    public setData(name: string, data: TData): void
    {
        const store: Dictionary<TData> = this._storage.get(this._storeKey) ?? {};

        store[name] = data;

        this._storage.set(this._storeKey, store);
    }

    /**
     * Gets stored data
     * @param name - Name of data to be retrieved
     */
    public getData(name: string): TData|null
    {
        return (this._storage.get<Dictionary<TData>>(this._storeKey)?.[name]) ?? null;
    }

    /**
     * Removes data from store
     * @param name - Name of data to be removed
     */
    public removeData(name: string): void
    {
        const store: Dictionary<TData> = this._storage.get(this._storeKey) ?? {};

        delete store[name];

        this._storage.set(this._storeKey, store);
    }

    /**
     * Gets stored data names
     */
    public getStored(): string[]
    {
        const store: Dictionary<TData> = this._storage.get(this._storeKey) ?? {};

        return Object.keys(store);
    }
}