import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {PagingComponentOptions} from '../paging.options';

/**
 * Paging model for properties editor
 */
export class PagingModel implements PagingComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public plugin: LayoutComponentMetadata|undefined|null;
    
    //######################### constructor #########################
    constructor(value: PagingComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}