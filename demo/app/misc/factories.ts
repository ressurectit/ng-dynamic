import {FactoryProvider} from '@angular/core';
import {PermanentStorage, PERMANENT_STORAGE} from '@anglr/common';

import {StoreDataService} from '../services/storeData';

/**
 * Creates factory provider for store data service
 * @param storeName - Name of storage that should be used
 */
export function createStoreDataServiceFactory(storeName: string): FactoryProvider
{
    return {
        provide: StoreDataService,
        useFactory: (storage: PermanentStorage) => new StoreDataService(storage, storeName),
        deps: [PERMANENT_STORAGE]
    };
}