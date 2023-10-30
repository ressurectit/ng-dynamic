import {Inject, Injectable, Optional} from '@angular/core';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';
import {Logger, LOGGER} from '@anglr/common';

/**
 * Dynamic module items provider for handlebars module items
 */
@Injectable()
export class HandlebarsDynamicModuleItemsProvider implements DynamicModuleProvider
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
            case 'handlebars-components':
            {
                try
                {
                    this._logger?.debug('HandlebarsDynamicModuleItemsProvider: trying to get item {{@item}}', {item: {name: source.name, package: source.package}});

                    const dynamicItemModule = await import(`../../dynamicItems/${source.name}/type`);

                    return dynamicItemModule;
                }
                catch(e)
                {
                    this._logger?.debug('HandlebarsDynamicModuleItemsProvider: item {{@item}} was not found, reason: ' + e, {item: {name: source.name, package: source.package}});
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