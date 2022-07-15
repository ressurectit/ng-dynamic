import {Type} from '@angular/core';
import {isJsObject} from '@jscrpt/common';

import {DynamicItemExtension, DynamicItemExtensions, DynamicModule} from '../../interfaces';
import {DynamicModuleDataExtractorFn} from '../../services';

/**
 * Module with extensions named exports
 */
interface ɵDynamicModuleNamedExtensions<TExtension extends DynamicItemExtension = any> extends DynamicModule
{
    /**
     * Extensions applied directly to self or object storing extensions and child extensions
     */
    extensions?: Type<TExtension>[]|DynamicItemExtensions<TExtension>;

    /**
     * Extensions applied to children
     */
    childExtensions?: Type<TExtension>[];
}

/**
 * Extracts dynamic item extensions which are exported as named exports of module
 */
export const extensionsExportsExtractor: DynamicModuleDataExtractorFn<DynamicItemExtensions> = (module, logger) =>
{
    const localModule = module as ɵDynamicModuleNamedExtensions;
    const extensionsObject = localModule.extensions as DynamicItemExtensions;

    logger?.debug('extensionsExportsExtractor: trying to extract dynamic item extensions');

    //extensions stored as object
    if(extensionsObject && isJsObject(extensionsObject) && (extensionsObject.extensions || extensionsObject.childExtensions))
    {
        return {
            extensions: extensionsObject.extensions,
            childExtensions: extensionsObject.childExtensions,
        };
    }

    if(localModule.childExtensions || localModule.extensions)
    {
        return {
            extensions: localModule.extensions as Type<DynamicItemExtension>[],
            childExtensions: localModule.childExtensions,
        };
    }

    return null;
};
