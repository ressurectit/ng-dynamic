import {DefaultKnownPropertyTypes, LayoutPropertyDescription, LayoutPropertyName, LayoutPropertyType} from '@anglr/dynamic/layout-editor';
import {mapValuesToThis} from '@jscrpt/common';

import {BasicPagingComponentOptions} from '../basicPaging.options';

/**
 * Basic paging model for properties editor
 */
export class BasicPagingModel implements BasicPagingComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Initial items per page')
    @LayoutPropertyDescription('Initial items per page for paging')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputNumber')
    public initialItemsPerPage: number|undefined|null = 15;
    
    //######################### constructor #########################
    constructor(value: BasicPagingComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}