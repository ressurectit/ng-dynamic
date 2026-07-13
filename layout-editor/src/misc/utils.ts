import {Type} from '@angular/core';
import {DynamicItemLoaderValidatorFn} from '@anglr/dynamic';
import {isBlank} from '@jscrpt/common';

import {PropertiesControl} from '../interfaces';
import {PropertiesControlGetter} from '../decorators/layoutEditorMetadata/layoutEditorMetadata.interface';
import {LayoutModuleTypes} from '../components/componentsPalette/componentsPalette.interface';

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

/**
 * Gets properties control getter for specific type
 * @param type - Type to be returned as properties control getter
 */
export function getPropertiesControl<TOptions>(type: Type<PropertiesControl<TOptions>>): PropertiesControlGetter<unknown>
{
    return () => type as Type<PropertiesControl<unknown>>;
}
