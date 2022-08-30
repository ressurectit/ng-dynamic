import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';

import {RelationsComponentsRegister} from '../relationsComponentsRegister/relationsComponentsRegister.service';

/**
 * Dynamic relations types provider for relations components
 */
@Injectable()
export class RelationsComponentsRelationsTypesProvider implements DynamicModuleProvider
{
    //######################### constructor #########################
    constructor(protected _componentsRegister: RelationsComponentsRegister,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of DynamicItemLoaderProvider #########################

    /**
     * @inheritdoc
     */
    public async tryToGet(source: DynamicItemSource): Promise<DynamicModule|null>
    {
        //only works with relations components
        if(source.package != 'relations-components')
        {
            return null;
        }

        this._logger?.debug('RelationsComponentsRelationsTypesProvider: trying to get relations types {@item}', {name: source.name, package: source.package});

        const types = await this._componentsRegister.getComponents();

        if(!types.length)
        {
            return null;
        }

        return {
            default: types
        };
    }
}