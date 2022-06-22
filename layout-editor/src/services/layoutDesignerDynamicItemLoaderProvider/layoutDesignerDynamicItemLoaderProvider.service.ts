import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemLoaderProvider, DynamicModule, DynamicItemSource} from '@anglr/dynamic';

/**
 * Dynamic item loader provider for built-in layout designer components
 */
@Injectable()
export class LayoutDesignerDynamicItemLoaderProvider implements DynamicItemLoaderProvider
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
        //only works with layout-editor
        if(source.package != '@anglr/dynamic/layout-editor')
        {
            return null;
        }

        try
        {
            this._logger?.debug('LayoutDesignerDynamicItemLoaderProvider: trying to get item {@item}', {name: source.name, package: source.package});

            if(source.name == 'layout-designer')
            {
                return await import('../../components/layoutDesigner/type');
            }
        }
        finally
        {
            this._logger?.debug('LayoutDesignerDynamicItemLoaderProvider: item {@item} was not found', {name: source.name, package: source.package});
        }

        return null;
    }
}