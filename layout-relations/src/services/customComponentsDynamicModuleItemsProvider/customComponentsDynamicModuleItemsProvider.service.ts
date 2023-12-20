import {Inject, Injectable, Optional} from '@angular/core';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';
import {Logger, LOGGER} from '@anglr/common';

import {CustomComponentsRegister} from '../customComponentsRegister/customComponentsRegister.service';

/**
 * Dynamic module items provider for custom components module items
 */
@Injectable()
export class CustomComponentsDynamicModuleItemsProvider implements DynamicModuleProvider
{
    //######################### constructor #########################
    constructor(@Optional() private _customComponentRegister: CustomComponentsRegister,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
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

        this._logger?.debug('CustomComponentsDynamicModuleItemsProvider: trying to get node {{@item}}', {item: {name: source.name, package: source.package}});

        switch(source.name)
        {
            case 'placeholder':
            {
                return await import('../../dynamicItems/placeholder/type');
            }
            case 'placeholderContainer':
            {
                return await import('../../dynamicItems/placeholderContainer/type');
            }
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
                const customComponent = await import('../../dynamicItems/customComponent/type');
                const customComponentConfiguration = await this._customComponentRegister?.getConfigurationForComponent(source.name);
                
                return {
                    default: customComponent.default,
                    extensions: customComponent.extensions,
                    displayName: customComponentConfiguration?.displayName,
                    description: customComponentConfiguration?.description,
                    group: customComponentConfiguration?.group,
                };
            }
        }
    }
}