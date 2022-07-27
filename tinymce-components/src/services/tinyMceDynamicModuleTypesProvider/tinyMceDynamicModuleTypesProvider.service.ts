import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';

/**
 * Dynamic module types provider, for tiny MCE types
 */
@Injectable()
export class TinyMceDynamicModuleTypesProvider implements DynamicModuleProvider
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
            this._logger?.debug('TinyMceDynamicModuleTypesProvider: trying to get types for module {@module}', {moduleName: source.package});

            switch(source.package)
            {
                case 'tinymce-components':
                    return await import('@anglr/dynamic/tinymce-components/types');
                default:
                    return null;
            }
        }
        catch(e)
        {
            this._logger?.debug('TinyMceDynamicModuleTypesProvider: module {@module} was not found, reason: ' + e, {moduleName: source.package});
        }

        return null;
    }
}