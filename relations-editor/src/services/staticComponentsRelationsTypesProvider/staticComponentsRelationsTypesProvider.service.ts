import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';

import {StaticComponentsRegister} from '../staticComponentsRegister/staticComponentsRegister.service';

/**
 * Dynamic relations types provider for static components
 */
@Injectable()
export class StaticComponentsRelationsTypesProvider implements DynamicModuleProvider
{
    //######################### constructor #########################
    constructor(protected _componentsRegister: StaticComponentsRegister,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of DynamicItemLoaderProvider #########################

    /**
     * @inheritdoc
     */
    public async tryToGet(source: DynamicItemSource): Promise<DynamicModule|null>
    {
        //only works with static components
        if(source.package != 'static-components')
        {
            return null;
        }

        this._logger?.debug('StaticComponentsRelationsTypesProvider: trying to get relations types {@item}', {name: source.name, package: source.package});

        const types = this._componentsRegister.types;

        if(!types)
        {
            return null;
        }

        return {
            default: types
        };
    }
}