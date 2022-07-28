import {defaultExportExtractor, DynamicItemDefData, DynamicItemExtensions, DynamicModuleDataExtractorFn, extensionsExportsExtractor} from '@anglr/dynamic';
import {resolvePromiseOr} from '@jscrpt/common';

import {LayoutEditorDesignerTypeType} from '../../decorators';

/**
 * Extracts layout designer type which is on decorated type exported by module exports as default export 
 */
export const layoutDesignerTypeExtractor: DynamicModuleDataExtractorFn<DynamicItemDefData&DynamicItemExtensions> = async (module, logger) =>
{
    const def = (await resolvePromiseOr(defaultExportExtractor(module, logger)));
    const ext = (await resolvePromiseOr(extensionsExportsExtractor(module, logger)));
    const localModule = def?.data as LayoutEditorDesignerTypeType;

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
            childExtensions: ext?.childExtensions,
            extensions: ext?.extensions
        };
    }

    return null;
};