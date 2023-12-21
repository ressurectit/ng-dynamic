import {Inject, Injectable} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';

/**
 * Dynamic module types provider, for grid types
 */
@Injectable()
export class GridDynamicModuleTypesProvider implements DynamicModuleProvider
{
    //######################### constructor #########################
    constructor(@Inject(LOGGER) protected logger: Logger,)
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
            this.logger.debug('GridDynamicModuleTypesProvider: trying to get types for module {{@module}}', {module: {moduleName: source.package}});

            switch(source.package)
            {
                case 'grid-components':
                    return await import('../../types');
                default:
                    return null;
            }
        }
        catch(e)
        {
            this.logger.debug('GridDynamicModuleTypesProvider: module {{@module}} was not found, reason: ' + e, {module: {moduleName: source.package}});
        }

        return null;
    }
}