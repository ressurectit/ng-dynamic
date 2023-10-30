import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';

/**
 * Dynamic module relations types provider, for material types
 */
@Injectable()
export class MaterialDynamicModuleRelationsProvider implements DynamicModuleProvider
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
            this._logger?.debug('MaterialDynamicModuleRelationsProvider: trying to get relations types for module {{@module}}', {module: {moduleName: source.package}});

            switch(source.package)
            {
                case 'material-components':
                    return await import('../../relations');
                default:
                    return null;
            }
        }
        catch(e)
        {
            this._logger?.debug('MaterialDynamicModuleRelationsProvider: module {{@module}} was not found, reason: ' + e, {module: {moduleName: source.package}});
        }

        return null;
    }
}