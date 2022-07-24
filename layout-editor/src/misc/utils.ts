import {Provider} from '@angular/core';
import {DynamicItemLoaderValidatorFn} from '@anglr/dynamic';
import {provideLayout} from '@anglr/dynamic/layout';
import {isBlank} from '@jscrpt/common';

import {LayoutModuleTypes} from '../components';
import {DEFAULT_LAYOUT_MODULE_TYPES_EXTRACTOR, DYNAMIC_LAYOUT_MODULE_TYPES_PROVIDER, LAYOUT_DESIGNER_COMPONENTS_PROVIDER, LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES_PROVIDER, LAYOUT_MODULE_TYPES_LOADER_PROVIDER} from './providers';
import {LayoutEditorMetadataExtractor, LayoutEditorMetadataManager, LayoutEditorPropertyMetadataExtractor} from '../services';

/**
 * Default providers for layout editor subpackage, including providers for layout subpackage
 */
export function provideLayoutEditor(): Provider[]
{
    return [
        ...provideLayout(),
        LAYOUT_DESIGNER_COMPONENTS_PROVIDER,
        DYNAMIC_LAYOUT_MODULE_TYPES_PROVIDER,
        DEFAULT_LAYOUT_MODULE_TYPES_EXTRACTOR,
        LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES_PROVIDER,
        LAYOUT_MODULE_TYPES_LOADER_PROVIDER,
        LayoutEditorMetadataExtractor,
        LayoutEditorPropertyMetadataExtractor,
        LayoutEditorMetadataManager,
    ];
}

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