import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicModuleProvider, DynamicModule, DynamicItemSource} from '@anglr/dynamic';

/**
 * Dynamic module items provider for built-in layout designer components
 */
@Injectable()
export class LayoutDesignerDynamicModuleItemsProvider implements DynamicModuleProvider
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
            this._logger?.debug('LayoutDesignerDynamicModuleItemsProvider: trying to get item {{@item}}', {item: {name: source.name, package: source.package}});

            if(source.name == 'layout-designer')
            {
                return await import('../../components/layoutDesigner/type');
            }
        }
        catch(e)
        {
            this._logger?.warn('LayoutDesignerDynamicModuleItemsProvider: item {{@item}} was not found, reason:' + e, {item: {name: source.name, package: source.package}});
        }

        this._logger?.debug('LayoutDesignerDynamicModuleItemsProvider: item {{@item}} was not found', {item: {name: source.name, package: source.package}});

        return null;
    }
}