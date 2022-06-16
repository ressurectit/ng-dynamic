import {Inject, Injectable, Optional, Type} from '@angular/core';
import {LOGGER, Logger} from '@anglr/common';
import {isType} from '@jscrpt/common';

import {DynamicItem, DynamicItemModule, DynamicItemType} from '../../metadata';
import {DynamicItemLoaderExtractor} from '../dynamicItemLoader/dynamicItemLoader.interface';

/**
 * Module with default export
 */
interface ɵDynamicItemModuleWithDefault extends DynamicItemModule
{
    /**
     * Default export value
     */
    default?: Type<DynamicItem>;
}

/**
 * Extracts dynamic item type which is module export
 */
@Injectable()
export class ModuleDynamicItemLoaderExtractor implements DynamicItemLoaderExtractor
{
    //######################### constructor #########################
    constructor(@Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of DynamicItemLoaderExtractor #########################

    /**
     * @inheritdoc
     */
    public tryToExtract(module: DynamicItemModule): DynamicItemType|null
    {
        const localModule = module as ɵDynamicItemModuleWithDefault;

        this._logger?.debug('ModuleDynamicItemLoaderExtractor: trying to extract DynamicItemType');

        if(localModule.default && isType(localModule.default))
        {
            return {
                type: localModule.default
            };
        }

        return null;
    }
}