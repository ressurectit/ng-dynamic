import {DynamicItemLoaderValidatorFn} from '@anglr/dynamic';
import {isBlank} from '@jscrpt/common';

import {LayoutModuleTypes} from '../components';

/**
 * Checks whether data is layout module types
 * @param data - Data to be checked
 */
export const isLayoutModuleTypes: DynamicItemLoaderValidatorFn<LayoutModuleTypes> = function(data): data is LayoutModuleTypes
{
    if(isBlank(data?.data) || !Array.isArray(data.data))
    {
        return false;
    }

    return true;
};
