import {Injectable, inject} from '@angular/core';
import {MetadataStorage} from '@anglr/dynamic';
import {RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';

import {StoreDataService} from '../storeData';

/**
 * Metadata storage for pure relations metadata
 */
@Injectable()
export class MetadataStorageRelations extends MetadataStorage<RelationsNodeMetadata[]>
{
    //######################### protected fields #########################

    /**
     * Instance of storage storing metadata
     */
    protected storage: StoreDataService<RelationsNodeMetadata[]> = inject(StoreDataService<RelationsNodeMetadata[]>);

    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    public override getMetadata(id: string): RelationsNodeMetadata[]|null
    {
        return this.storage.getData(id);
    }
}