import {Injectable, inject} from '@angular/core';
import {LOGGER, Logger} from '@anglr/common';
import {PromiseOr} from '@jscrpt/common';

/**
 * Class that represents default metadata storage
 */
@Injectable()
export class MetadataStorage<TMetadata>
{
    //######################### protected fields #########################

    /**
     * Instance of logger used for creating logs
     */
    protected logger: Logger = inject(LOGGER);

    //######################### public methods #########################

    /**
     * Gets metadata from storage
     * @param id - Id of metadata to be obtained
     */
    public getMetadata(id: string): PromiseOr<TMetadata|null>
    {
        this.logger.warn('MetadataStorage: default metadata storage has no metadata for "{{id}}"', {id});

        return null;
    }
}