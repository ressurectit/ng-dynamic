import {Inject, Injectable, Optional} from '@angular/core';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';
import {Logger, LOGGER} from '@anglr/common';

/**
 * Dynamic module items provider for form module items
 */
@Injectable()
export class FormDynamicModuleItemsProvider implements DynamicModuleProvider
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
            case 'form-components':
            {
                try
                {
                    this._logger?.debug('FormDynamicModuleItemsProvider: trying to get item {@item}', {name: source.name, package: source.package});

                    const dynamicItemModule = await import(`@anglr/dynamic/form/dynamicItems/${source.name}/type`);

                    return dynamicItemModule;
                }
                catch(e)
                {
                    this._logger?.debug('FormDynamicModuleItemsProvider: item {@item} was not found, reason: ' + e, {name: source.name, package: source.package});
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