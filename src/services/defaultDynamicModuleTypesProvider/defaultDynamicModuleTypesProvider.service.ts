import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';

import {DynamicItemSource, DynamicModule} from '../../interfaces';
import {DynamicModuleProvider} from '../dynamicItemLoader/dynamicItemLoader.interface';

/**
 * Default dynamic module types provider, for built-in types
 */
@Injectable()
export class DefaultDynamicModuleTypesProvider implements DynamicModuleProvider
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
        try
        {
            this._logger?.debug('DefaultDynamicModuleTypesProvider: trying to get types for module {@module}', {moduleName: source.package});

            switch(source.package)
            {
                case 'basic-components':
                    return await import('@anglr/dynamic/basic-components/types');
                case 'material-components':
                    return await import('@anglr/dynamic/material-components/types');
                default:
                    return null;
            }
        }
        catch(e)
        {
            this._logger?.debug('DefaultDynamicModuleTypesProvider: module {@module} was not found, reason: ' + e, {moduleName: source.package});
        }

        return null;
    }
}