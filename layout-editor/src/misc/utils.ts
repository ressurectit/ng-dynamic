import {Provider} from '@angular/core';
import {DefaultDynamicPackage, DynamicItemLoaderValidatorFn, provideStaticPackageSource} from '@anglr/dynamic';
import {provideLayout} from '@anglr/dynamic/layout';
import {isBlank} from '@jscrpt/common';

import {LayoutModuleTypes} from '../components';
import {DEFAULT_LAYOUT_MODULE_TYPES_EXTRACTOR, DESIGNER_LAYOUT_COMPONENTS_EXTRACTOR, DYNAMIC_LAYOUT_MODULE_TYPES_PROVIDER, LAYOUT_DESIGNER_COMPONENTS_PROVIDER, LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES_PROVIDER, LAYOUT_HISTORY_MANAGER_STATE, LAYOUT_HISTORY_MANAGER_PROVIDER, LAYOUT_MODULE_TYPES_LOADER_PROVIDER} from './providers';
import {DragActiveService, LayoutEditorMetadataExtractor, LayoutEditorMetadataManager, LayoutEditorPropertyMetadataExtractor} from '../services';

/**
 * Default providers for layout editor subpackage, including providers for layout subpackage
 * @param designerLayout - Indication whether provide extractor for layout designer types, defaults to true
 * @param packages - Array of default packages to be used, if omitted all built-in packages are used
 */
export function provideLayoutEditor(designerLayout: boolean = true, packages: DefaultDynamicPackage[] = ['basic-components', 'material-components']): Provider[]
{
    return [
        ...designerLayout ? [DESIGNER_LAYOUT_COMPONENTS_EXTRACTOR] : [],
        ...provideLayout(),
        LAYOUT_DESIGNER_COMPONENTS_PROVIDER,
        DYNAMIC_LAYOUT_MODULE_TYPES_PROVIDER,
        DEFAULT_LAYOUT_MODULE_TYPES_EXTRACTOR,
        LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES_PROVIDER,
        LAYOUT_MODULE_TYPES_LOADER_PROVIDER,
        LayoutEditorMetadataExtractor,
        LayoutEditorPropertyMetadataExtractor,
        LayoutEditorMetadataManager,
        DragActiveService,
        LAYOUT_HISTORY_MANAGER_PROVIDER,
        LAYOUT_HISTORY_MANAGER_STATE,
        ...packages.map(pkg => provideStaticPackageSource(pkg)),
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