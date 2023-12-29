import {DefaultKnownPropertyTypes, LayoutPropertyDescription, LayoutPropertyName, LayoutPropertyType} from '@anglr/dynamic/layout-editor';
import {mapValuesToThis} from '@jscrpt/common';

import {PreviousNextPagingComponentOptions} from '../previousNextPaging.options';

/**
 * Previous next paging model for properties editor
 */
export class PreviousNextPagingModel implements PreviousNextPagingComponentOptions
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
    constructor(value: PreviousNextPagingComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}