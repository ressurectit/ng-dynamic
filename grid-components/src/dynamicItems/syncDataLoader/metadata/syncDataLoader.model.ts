import {mapValuesToThis} from '@jscrpt/common';

import {SyncDataLoaderComponentOptions} from '../syncDataLoader.options';

/**
 * Sync data loader model for properties editor
 */
export class SyncDataLoaderModel implements SyncDataLoaderComponentOptions
{
    //######################### public properties #########################
    
    //######################### constructor #########################
    constructor(value: SyncDataLoaderComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}