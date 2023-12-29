import {mapValuesToThis} from '@jscrpt/common';

import {AsyncDataLoaderComponentOptions} from '../asyncDataLoader.options';

/**
 * Async data loader model for properties editor
 */
export class AsyncDataLoaderModel implements AsyncDataLoaderComponentOptions
{
    //######################### public properties #########################
    
    //######################### constructor #########################
    constructor(value: AsyncDataLoaderComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}