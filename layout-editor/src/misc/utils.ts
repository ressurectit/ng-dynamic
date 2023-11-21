import {ClassProvider, Provider, Type} from '@angular/core';
import {DefaultsOverride, DynamicItemLoaderValidatorFn} from '@anglr/dynamic';
import {provideLayout} from '@anglr/dynamic/layout';
import {isBlank} from '@jscrpt/common';

import {LayoutModuleTypes} from '../components';
import {DEFAULT_LAYOUT_MODULE_TYPES_EXTRACTOR, DESIGNER_LAYOUT_COMPONENTS_EXTRACTOR, LAYOUT_DESIGNER_COMPONENTS_PROVIDER, LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES_PROVIDER, LAYOUT_HISTORY_MANAGER_STATE, LAYOUT_HISTORY_MANAGER_PROVIDER, LAYOUT_MODULE_TYPES_LOADER_PROVIDER} from './providers';
import {DragActiveService, LayoutComponentsIteratorService, LayoutEditorMetadataExtractor, LayoutEditorMetadataManager, LayoutEditorPropertyMetadataExtractor, LiveEventService} from '../services';
import {LAYOUT_DEFAULTS_OVERRIDE} from './tokens';

/**
 * Default providers for layout editor subpackage, including providers for layout subpackage
 * @param designerLayout - Indication whether provide extractor for layout designer types, defaults to true
 * @param packages - Array of default packages to be used, if omitted all built-in packages are used
 */
export function provideLayoutEditor(designerLayout: boolean = true): Provider[]
{
    return [
        ...designerLayout ? [DESIGNER_LAYOUT_COMPONENTS_EXTRACTOR] : [],
        ...provideLayout(),
        LAYOUT_DESIGNER_COMPONENTS_PROVIDER,
        DEFAULT_LAYOUT_MODULE_TYPES_EXTRACTOR,
        LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES_PROVIDER,
        LAYOUT_MODULE_TYPES_LOADER_PROVIDER,
        LayoutEditorMetadataExtractor,
        LayoutEditorPropertyMetadataExtractor,
        LayoutEditorMetadataManager,
        DragActiveService,
        LiveEventService,
        LayoutComponentsIteratorService,
        LAYOUT_HISTORY_MANAGER_PROVIDER,
        LAYOUT_HISTORY_MANAGER_STATE,
    ];
}

/**
 * Provider for layout defaults override
 * @param defaultsOverride - Service to pride as layout defaults override
 */
export function provideLayoutDefaultsOverride(defaultsOverride: Type<DefaultsOverride>): Provider
{
    return <ClassProvider>{
        provide: LAYOUT_DEFAULTS_OVERRIDE,
        useClass: defaultsOverride
    };
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