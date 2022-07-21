import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';

import {StaticComponentsRegister} from '../staticComponentsRegister/staticComponentsRegister.service';

/**
 * Dynamic relations nodes provider for layout components
 */
@Injectable()
export class LayoutComponentsRelationsNodesProvider implements DynamicModuleProvider
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

        this._logger?.debug('LayoutComponentsRelationsNodesProvider: trying to get node {@item}', {name: source.name, package: source.package});

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