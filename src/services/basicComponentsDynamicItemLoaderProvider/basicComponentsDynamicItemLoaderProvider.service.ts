import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';

import {DynamicItemModule, DynamicItemSource} from '../../interfaces';
import {DynamicItemLoaderProvider} from '../dynamicItemLoader/dynamicItemLoader.interface';

/**
 * Dynamic item loader provider for built-in basic-components
 */
@Injectable()
export class BasicComponentsDynamicItemLoaderProvider implements DynamicItemLoaderProvider
{
    //######################### constructor #########################
    constructor(@Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of DynamicItemLoaderProvider #########################

    /**
     * @inheritdoc
     */
    public async tryToGet(source: DynamicItemSource): Promise<DynamicItemModule|null>
    {
        //only works with basic-components
        if(source.package != 'basic-components' && source.package != '@anglr/dynamic/basic-components')
        {
            return null;
        }

        try
        {
            this._logger?.debug('BasicComponentsDynamicItemLoaderProvider: trying to get item {@item}', {name: source.name, package: source.package});

            const dynamicItemModule = await import(`@anglr/dynamic/basic-components/${source.name}/type`);

            return dynamicItemModule;
        }
        catch(e)
        {
            this._logger?.debug('BasicComponentsDynamicItemLoaderProvider: item {@item} was not found, reason: ' + e, {name: source.name, package: source.package});
        }

        return null;
    }
}