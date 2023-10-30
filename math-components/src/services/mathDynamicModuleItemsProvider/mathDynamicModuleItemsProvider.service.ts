import {Inject, Injectable, Optional} from '@angular/core';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';
import {Logger, LOGGER} from '@anglr/common';

/**
 * Dynamic module items provider for math module items
 */
@Injectable()
export class MathDynamicModuleItemsProvider implements DynamicModuleProvider
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
            case 'math-components':
            {
                try
                {
                    this._logger?.debug('MathDynamicModuleItemsProvider: trying to get item {{@item}}', {item: {name: source.name, package: source.package}});

                    const dynamicItemModule = await import(`../../dynamicItems/${source.name}/type`);

                    return dynamicItemModule;
                }
                catch(e)
                {
                    this._logger?.debug('MathDynamicModuleItemsProvider: item {{@item}} was not found, reason: ' + e, {item: {name: source.name, package: source.package}});
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