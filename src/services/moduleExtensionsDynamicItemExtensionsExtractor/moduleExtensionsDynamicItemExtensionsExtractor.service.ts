import {Inject, Injectable, Optional, Type} from '@angular/core';
import {LOGGER, Logger} from '@anglr/common';
import {isJsObject} from '@jscrpt/common';

import {DynamicItemExtension, DynamicModule} from '../../interfaces';
import {DynamicItemExtensionsExtractor, DynamicModuleExtensions} from '../dynamicItemLoader/dynamicItemLoader.interface';

/**
 * Module with extensions named exports
 */
interface ɵDynamicModuleNamedExtensions extends DynamicModule
{
    /**
     * Extensions applied directly to self or object storing extensions and child extensions
     */
    extensions?: Type<DynamicItemExtension>[]|DynamicModuleExtensions;

    /**
     * Extensions applied to children
     */
    childExtensions?: Type<DynamicItemExtension>[];
}

/**
 * Extracts dynamic item extensions which are exported as named exports of module
 */
@Injectable()
export class ModuleExtensionsDynamicItemExtensionsExtractor implements DynamicItemExtensionsExtractor
{
    //######################### constructor #########################
    constructor(@Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of DynamicModuleDataExtractor #########################

    /**
     * @inheritdoc
     */
    public tryToExtract(module: DynamicModule): DynamicModuleExtensions|null
    {
        const localModule = module as ɵDynamicModuleNamedExtensions;
        const extensionsObject = localModule.extensions as DynamicModuleExtensions;

        this._logger?.debug('ModuleExtensionsDynamicItemExtensionsExtractor: trying to extract dynamic item extensions');

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
    }
}