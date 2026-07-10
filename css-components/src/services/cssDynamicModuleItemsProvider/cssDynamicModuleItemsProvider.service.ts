import {Inject, Injectable, Optional} from '@angular/core';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';
import {Logger, LOGGER} from '@anglr/common';
import {globalDefine, isBlank} from '@jscrpt/common';

declare const ngDemoEnvironment: false;

globalDefine(global =>
{
    if(isBlank(global.ngDemoEnvironment))
    {
        global.ngDemoEnvironment = false;
    }
});

/**
 * Dynamic module items provider for css module items
 */
@Injectable()
export class CssDynamicModuleItemsProvider implements DynamicModuleProvider
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
            case 'css-components':
            {
                try
                {
                    this._logger?.debug('CssDynamicModuleItemsProvider: trying to get item {{@item}}', {item: {name: source.name, package: source.package}});

                    const dynamicItemModule = ngDemoEnvironment ? await import(`../../dynamicItems/${source.name}/type.ts`) : await import(`../../dynamicItems/${source.name}/type.js`);

                    return dynamicItemModule;
                }
                catch(e)
                {
                    this._logger?.debug('CssDynamicModuleItemsProvider: item {{@item}} was not found, reason: ' + e, {item: {name: source.name, package: source.package}});
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