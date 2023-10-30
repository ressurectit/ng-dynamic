import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';

import {StaticComponentsRegister} from '../staticComponentsRegister/staticComponentsRegister.service';

/**
 * Dynamic relations nodes provider for static components
 */
@Injectable()
export class StaticComponentsRelationsNodesProvider implements DynamicModuleProvider
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
    public tryToGet(source: DynamicItemSource): DynamicModule|null
    {
        //only works with static components
        if(source.package != 'static-components')
        {
            return null;
        }

        this._logger?.debug('StaticComponentsRelationsNodesProvider: trying to get node {{@item}}', {item: {name: source.name, package: source.package}});

        const type = this._componentsRegister.getType(source.name);

        if(!type)
        {
            return null;
        }

        return {
            default: type
        };
    }
}