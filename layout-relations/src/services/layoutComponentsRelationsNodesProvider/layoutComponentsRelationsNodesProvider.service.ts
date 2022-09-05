import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';

import {LayoutComponentsRegister} from '../layoutComponentsRegister/layoutComponentsRegister.service';

/**
 * Dynamic relations nodes provider for layout components
 */
@Injectable()
export class LayoutComponentsRelationsNodesProvider implements DynamicModuleProvider
{
    //######################### constructor #########################
    constructor(protected _componentsRegister: LayoutComponentsRegister,
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

        this._logger?.debug('LayoutComponentsRelationsNodesProvider: trying to get node {@item}', {name: source.name, package: source.package});

        const type = await this._componentsRegister.getType(source.name);
        
        if(!type)
        {
            return null;
        }

        const displayName = await this._componentsRegister.getDisplayName(source.name);
        const scope = await this._componentsRegister.getScope(source.name);

        return {
            default: type,
            displayName,
            scope,
        };
    }
}