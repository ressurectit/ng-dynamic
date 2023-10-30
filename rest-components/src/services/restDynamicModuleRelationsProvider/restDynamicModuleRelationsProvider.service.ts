import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';

/**
 * Dynamic module relations types provider, for rest types
 */
@Injectable()
export class RestDynamicModuleRelationsProvider implements DynamicModuleProvider
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
            this._logger?.debug('RestDynamicModuleRelationsProvider: trying to get relations types for module {{@module}}', {module: {moduleName: source.package}});

            switch(source.package)
            {
                case 'rest-components':
                    return await import('../../relations');
                default:
                    return null;
            }
        }
        catch(e)
        {
            this._logger?.debug('RestDynamicModuleRelationsProvider: module {{@module}} was not found, reason: ' + e, {module: {moduleName: source.package}});
        }

        return null;
    }
}