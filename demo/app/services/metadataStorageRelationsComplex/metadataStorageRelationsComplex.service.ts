import {Injectable, inject} from '@angular/core';
import {MetadataStorage} from '@anglr/dynamic';
import {RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';

import {StoreDataService} from '../storeData';
import {LayoutRelationsMetadata} from '../../misc/interfaces';

/**
 * Metadata storage for relations metadata from complex (both relations and layout) metadata
 */
@Injectable()
export class MetadataStorageRelationsComplex extends MetadataStorage<RelationsNodeMetadata[]>
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
    public override getMetadata(id: string): RelationsNodeMetadata[]|null
    {
        return this.storage.getData(id).relations;
    }
}