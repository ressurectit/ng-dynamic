import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';

import {DynamicModule} from '../../interfaces';
import {DynamicModuleTypesProvider} from '../dynamicModuleTypesLoader/dynamicModuleTypesLoader.interface';

/**
 * Default dynamic module types provider, for built-in types
 */
@Injectable()
export class DefaultDynamicModuleTypesProvider implements DynamicModuleTypesProvider
{
    //######################### constructor #########################
    constructor(@Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of DynamicItemLoaderProvider #########################

    /**
     * @inheritdoc
     */
    public async tryToGet(moduleName: string): Promise<DynamicModule|null>
    {
        try
        {
            this._logger?.debug('DefaultDynamicModuleTypesProvider: trying to get types for module {@module}', {moduleName});

            const dynamicItemModule = await import('@anglr/dynamic/basic-components/types');

            return dynamicItemModule;
        }
        catch(e)
        {
            this._logger?.debug('DefaultDynamicModuleTypesProvider: module {@module} was not found, reason: ' + e, {moduleName});
        }

        return null;
    }
}