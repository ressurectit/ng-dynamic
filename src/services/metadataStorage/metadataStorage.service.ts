import {Func, PromiseOr} from '@jscrpt/common';

/**
 * Class that represents abstract metadata storage
 */
export class MetadataStorage<TMetadata = any>
{
    //######################### constructor #########################
    constructor(protected getMetadataFn: Func<PromiseOr<TMetadata|null>, [string]>,)
    {
    }

    //######################### public methods #########################

    /**
     * Gets metadata from storage
     * @param id - Id of metadata to be obtained
     */
    public getMetadata(id: string): PromiseOr<TMetadata|null>
    {
        return this.getMetadataFn(id);
    }
}