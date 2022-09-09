import {Inject, Injectable, Optional} from '@angular/core';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';
import {Logger, LOGGER} from '@anglr/common';

/**
 * Dynamic module items provider for rest module items
 */
@Injectable()
export class RestDynamicModuleItemsProvider implements DynamicModuleProvider
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
            case 'rest-components':
            {
                try
                {
                    this._logger?.debug('RestDynamicModuleItemsProvider: trying to get item {@item}', {name: source.name, package: source.package});

                    const dynamicItemModule = await import(`@anglr/dynamic/rest-components/dynamicItems/${source.name}/type`);

                    return dynamicItemModule;
                }
                catch(e)
                {
                    this._logger?.debug('RestDynamicModuleItemsProvider: item {@item} was not found, reason: ' + e, {name: source.name, package: source.package});
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