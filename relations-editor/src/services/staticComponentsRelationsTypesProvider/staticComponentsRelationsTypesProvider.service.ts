import {Inject, Injectable} from '@angular/core';
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
    constructor(protected componentsRegister: StaticComponentsRegister,
                @Inject(LOGGER) protected logger: Logger,)
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

        this.logger.debug('StaticComponentsRelationsTypesProvider: trying to get relations types {{@item}}', {item: {name: source.name, package: source.package}});

        const types = this.componentsRegister.types;

        if(!types)
        {
            return null;
        }

        return {
            default: types
        };
    }
}