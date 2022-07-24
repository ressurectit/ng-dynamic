import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemLoader, DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';
import {RelationsNodeDef, RELATIONS_NODES_LOADER} from '@anglr/dynamic/relations-editor';

import {LayoutComponentsRegister} from '../layoutComponentsRegister/layoutComponentsRegister.service';

/**
 * Dynamic relations types provider for layout components
 */
@Injectable()
export class LayoutComponentsRelationsTypesProvider implements DynamicModuleProvider
{
    //######################### constructor #########################
    constructor(protected _componentsRegister: LayoutComponentsRegister,
                @Inject(RELATIONS_NODES_LOADER) protected _loader: DynamicItemLoader<RelationsNodeDef>,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of DynamicItemLoaderProvider #########################

    /**
     * @inheritdoc
     */
    public async tryToGet(source: DynamicItemSource): Promise<DynamicModule|null>
    {
        //only works with layout components
        if(source.package != 'layout-components')
        {
            return null;
        }

        this._logger?.debug('LayoutComponentsRelationsTypesProvider: trying to get relations types {@item}', {name: source.name, package: source.package});

        const types = await this._componentsRegister.types;

        if(!types)
        {
            return null;
        }

        const resultTypes = [];

        for(const type of types)
        {
            const node = await this._loader.loadItem({package: 'layout-components', name: type});

            if(node?.data)
            {
                resultTypes.push(type);
            }
        }

        return {
            default: resultTypes,
        };
    }
}