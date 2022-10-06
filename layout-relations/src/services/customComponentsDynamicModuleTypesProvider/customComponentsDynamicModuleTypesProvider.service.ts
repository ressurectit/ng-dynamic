import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';

import {CustomComponentsRegister} from '../customComponentsRegister/customComponentsRegister.service';

/**
 * Dynamic module types provider, for custom components types
 */
@Injectable()
export class CustomComponentsDynamicModuleTypesProvider implements DynamicModuleProvider
{
    //######################### constructor #########################
    constructor(protected _componentsRegister: CustomComponentsRegister,
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

        this._logger?.debug('CustomComponentsDynamicModuleTypesProvider: trying to get relations types {@item}', {name: source.name, package: source.package});

        const types = await this._componentsRegister.getRegisteredComponents();

        if(!types.length)
        {
            return {
                default: 
                [
                    'placeholder',
                ]
            };
        }

        return {
            default: 
            [
                ...types,
                'placeholder',
            ]
        };
    }
}