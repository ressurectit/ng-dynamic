import {defaultExportExtractor, DynamicItemDefData, DynamicItemEditorData, DynamicItemExtensions, DynamicModule, DynamicModuleDataExtractorFn, extensionsExportsExtractor} from '@anglr/dynamic';

import {LayoutEditorDesignerTypeType} from '../../decorators';

/**
 * Module with default export
 */
interface ɵDynamicModuleWithEditorData extends DynamicModule
{
    /**
     * Display name of custom component
     */
    displayName?: string;

    /**
     * Description for custom component
     */
    description?: string;

    /**
     * Group of custom component
     */
    group?: string;
}

/**
 * Extracts layout designer type which is on decorated type exported by module exports as default export 
 */
export const layoutDesignerTypeExtractor: DynamicModuleDataExtractorFn<DynamicItemDefData&DynamicItemExtensions&DynamicItemEditorData> = async (module, logger) =>
{
    const def = (await defaultExportExtractor(module, logger));
    const ext = (await extensionsExportsExtractor(module, logger));
    const localModule = def?.data as LayoutEditorDesignerTypeType;
    const localModuleEditorData = module as ɵDynamicModuleWithEditorData;

    logger?.debug('layoutDesignerTypeExtractor: trying to extract default dynamic data');

    if(!localModule?.layoutEditorDesignerType)
    {
        return null;
    }

    const type = await localModule?.layoutEditorDesignerType;

    if(type)
    {
        return {
            data: type,
            displayName: localModuleEditorData?.displayName,
            description: localModuleEditorData?.description,
            group: localModuleEditorData?.group,
            childExtensions: ext?.childExtensions,
            extensions: ext?.extensions
        };
    }

    return null;
};