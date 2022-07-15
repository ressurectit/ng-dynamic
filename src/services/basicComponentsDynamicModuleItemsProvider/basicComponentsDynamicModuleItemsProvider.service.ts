import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';

import {DynamicModule, DynamicItemSource} from '../../interfaces';
import {DynamicModuleProvider} from '../dynamicItemLoader/dynamicItemLoader.interface';

/**
 * Dynamic module items provider for built-in basic-components
 */
@Injectable()
export class BasicComponentsDynamicModuleItemsProvider implements DynamicModuleProvider
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
        //only works with basic-components
        if(source.package != 'basic-components' && source.package != '@anglr/dynamic/basic-components')
        {
            return null;
        }

        try
        {
            this._logger?.debug('BasicComponentsDynamicModuleItemsProvider: trying to get item {@item}', {name: source.name, package: source.package});

            const dynamicItemModule = await import(`@anglr/dynamic/basic-components/${source.name}/type`);

            return dynamicItemModule;
        }
        catch(e)
        {
            this._logger?.debug('BasicComponentsDynamicModuleItemsProvider: item {@item} was not found, reason: ' + e, {name: source.name, package: source.package});
        }

        return null;
    }
}