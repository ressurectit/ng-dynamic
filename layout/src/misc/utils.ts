import {DynamicItemLoaderValidatorFn} from '@anglr/dynamic';
import {isBlank, isPresent, isType} from '@jscrpt/common';

import {LayoutComponentDef} from './types';

/**
 * Checks whether data is layout component def
 * @param data - Data to be checked
 */
export const isLayoutComponentDef: DynamicItemLoaderValidatorFn<LayoutComponentDef> = function(data): data is LayoutComponentDef
{
    //type is required and must be type
    if(isBlank(data?.data) || !isType(data.data))
    {
        return false;
    }

    if(isPresent(data?.childExtensions) && (!Array.isArray(data.childExtensions) || data.childExtensions.some(itm => !isType(itm))))
    {
        return false;
    }

    if(isPresent(data?.extensions) && (!Array.isArray(data.extensions) || data.extensions.some(itm => !isType(itm))))
    {
        return false;
    }

    return true;
};
