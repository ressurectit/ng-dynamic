import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {DataLoaderComponentOptions} from '../dataLoader.options';

/**
 * Data loader model for properties editor
 */
export class DataLoaderModel implements DataLoaderComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public plugin: LayoutComponentMetadata|undefined|null;
    
    //######################### constructor #########################
    constructor(value: DataLoaderComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}