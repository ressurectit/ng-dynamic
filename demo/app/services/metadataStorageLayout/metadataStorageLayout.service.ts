import {Injectable, inject} from '@angular/core';
import {MetadataStorage} from '@anglr/dynamic';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

import {StoreDataService} from '../storeData';

/**
 * Metadata storage for pure layout metadata
 */
@Injectable()
export class MetadataStorageLayout extends MetadataStorage<LayoutComponentMetadata>
{
    //######################### protected fields #########################

    /**
     * Instance of storage storing metadata
     */
    protected storage: StoreDataService<LayoutComponentMetadata> = inject(StoreDataService<LayoutComponentMetadata>);

    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    public override getMetadata(id: string): LayoutComponentMetadata|null
    {
        return this.storage.getData(id);
    }
}