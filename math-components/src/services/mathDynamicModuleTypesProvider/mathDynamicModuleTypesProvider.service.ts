import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';

/**
 * Dynamic module types provider, for math types
 */
@Injectable()
export class MathDynamicModuleTypesProvider implements DynamicModuleProvider
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
            this._logger?.debug('MathDynamicModuleTypesProvider: trying to get types for module {@module}', {moduleName: source.package});

            switch(source.package)
            {
                case 'math-components':
                    return await import('../../types');
                default:
                    return null;
            }
        }
        catch(e)
        {
            this._logger?.debug('MathDynamicModuleTypesProvider: module {@module} was not found, reason: ' + e, {moduleName: source.package});
        }

        return null;
    }
}