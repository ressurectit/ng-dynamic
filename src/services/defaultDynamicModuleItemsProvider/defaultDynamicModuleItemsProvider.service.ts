import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';

import {DynamicModule, DynamicItemSource} from '../../interfaces';
import {DynamicModuleProvider} from '../dynamicItemLoader/dynamicItemLoader.interface';

/**
 * Dynamic module items provider for built-in module items
 */
@Injectable()
export class DefaultDynamicModuleItemsProvider implements DynamicModuleProvider
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
        switch(source.package)
        {
            case 'basic-components':
            {
                try
                {
                    this._logger?.debug('DefaultDynamicModuleItemsProvider: trying to get item {@item}', {name: source.name, package: source.package});

                    const dynamicItemModule = await import(`@anglr/dynamic/basic-components/dynamicItems/${source.name}/type`);

                    return dynamicItemModule;
                }
                catch(e)
                {
                    this._logger?.debug('DefaultDynamicModuleItemsProvider: item {@item} was not found, reason: ' + e, {name: source.name, package: source.package});
                }

                break;
            }
            case 'material-components':
            {
                try
                {
                    this._logger?.debug('DefaultDynamicModuleItemsProvider: trying to get item {@item}', {name: source.name, package: source.package});
        
                    const dynamicItemModule = await import(`@anglr/dynamic/material-components/dynamicItems/${source.name}/type`);
        
                    return dynamicItemModule;
                }
                catch(e)
                {
                    this._logger?.debug('DefaultDynamicModuleItemsProvider: item {@item} was not found, reason: ' + e, {name: source.name, package: source.package});
                }

                break;
            }
            default:
            {
                return null;
            }
        }

        return null;
    }
}