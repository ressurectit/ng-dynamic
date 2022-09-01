import {Inject, Injectable, Optional} from '@angular/core';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';
import {Logger, LOGGER} from '@anglr/common';

/**
 * Dynamic module items provider for custom components module items
 */
@Injectable()
export class CustomComponentsDynamicModuleItemsProvider implements DynamicModuleProvider
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
        //only works with custom components
        if(source.package != 'custom-components')
        {
            return null;
        }

        this._logger?.debug('CustomComponentsDynamicModuleItemsProvider: trying to get node {@item}', {name: source.name, package: source.package});

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
                return await import('../../dynamicItems/customComponent/type');
            }
        }
    }
}