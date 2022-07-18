import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';

import {DynamicModule, DynamicItemSource} from '../../interfaces';
import {DynamicModuleProvider} from '../dynamicItemLoader/dynamicItemLoader.interface';

/**
 * Dynamic module items provider for built-in material-components
 */
@Injectable()
export class MaterialComponentsDynamicModuleItemsProvider implements DynamicModuleProvider
{
    //######################### constructor #########################
    constructor(@Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of DynamicItemLoaderProvider #########################

    /**
     * @inheritdoc
     */
    public async tryToGet(source: DynamicItemSource): Promise<DynamicModule|null>
    {
        //only works with material-components
        if(source.package != 'material-components' && source.package != '@anglr/dynamic/material-components')
        {
            return null;
        }

        try
        {
            this._logger?.debug('MaterialComponentsDynamicModuleItemsProvider: trying to get item {@item}', {name: source.name, package: source.package});

            const dynamicItemModule = await import(`@anglr/dynamic/material-components/${source.name}/type`);

            return dynamicItemModule;
        }
        catch(e)
        {
            this._logger?.debug('MaterialComponentsDynamicModuleItemsProvider: item {@item} was not found, reason: ' + e, {name: source.name, package: source.package});
        }

        return null;
    }
}