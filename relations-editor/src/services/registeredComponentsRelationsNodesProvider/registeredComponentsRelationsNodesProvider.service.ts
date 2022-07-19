import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemSource, DynamicModuleProvider} from '@anglr/dynamic';
import {RelationsComponentManager} from '@anglr/dynamic/relations';

import {RegisteredComponentModule} from './registeredComponentsRelationsNodesProvider.interface';

/**
 * Dynamic relations nodes provider for registered components
 */
@Injectable()
export class RegisteredComponentsRelationsNodesProvider implements DynamicModuleProvider
{
    //######################### constructor #########################
    constructor(protected _relationsComponentManager: RelationsComponentManager,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of DynamicItemLoaderProvider #########################

    /**
     * @inheritdoc
     */
    public async tryToGet(source: DynamicItemSource): Promise<RegisteredComponentModule|null>
    {
        //only works with registered components
        if(source.package != 'ɵRegisteredComponent')
        {
            return null;
        }

        this._logger?.debug('RegisteredComponentsRelationsNodesProvider: trying to get node {@item}', {name: source.name, package: source.package});

        const cmp = this._relationsComponentManager.get(source.name);

        if(!cmp)
        {
            return null;
        }

        return {
            ɵRegisteredComponent: Object.getPrototypeOf(cmp)
        };
    }
}