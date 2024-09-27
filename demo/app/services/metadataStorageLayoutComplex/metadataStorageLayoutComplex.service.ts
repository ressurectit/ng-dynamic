import {Injectable, inject} from '@angular/core';
import {MetadataStorage} from '@anglr/dynamic';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

import {StoreDataService} from '../storeData';
import {LayoutRelationsMetadata} from '../../misc/interfaces';


/**
 * Metadata storage for layout metadata from complex (both relations and layout) metadata
 */
@Injectable()
export class MetadataStorageLayoutComplex extends MetadataStorage<LayoutComponentMetadata>
{
    //######################### protected fields #########################

    /**
     * Instance of storage storing metadata
     */
    protected storage: StoreDataService<LayoutRelationsMetadata> = inject(StoreDataService<LayoutRelationsMetadata>);

    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    public override getMetadata(id: string): LayoutComponentMetadata|null
    {
        return this.storage.getData(id)?.layout ?? null;
    }
}