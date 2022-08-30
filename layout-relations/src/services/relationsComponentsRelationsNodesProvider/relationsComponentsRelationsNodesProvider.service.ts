import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';

/**
 * Dynamic relations nodes provider for relations components
 */
@Injectable()
export class RelationsComponentsRelationsNodesProvider implements DynamicModuleProvider
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
        //only works with relations components
        if(source.package != 'relations-components')
        {
            return null;
        }

        this._logger?.debug('RelationsComponentsRelationsNodesProvider: trying to get node {@item}', {name: source.name, package: source.package});

        switch(source.name)
        {
            case 'componentInputs':
            {
                return await import('../../dynamicItems/componentInputs/type');
            }
            case 'componentOutputs':
            {
                return await import('../../dynamicItems/componentOutputs/type');
            }
            default:
            {
                break;
            }
        }

        return null;
    }
}