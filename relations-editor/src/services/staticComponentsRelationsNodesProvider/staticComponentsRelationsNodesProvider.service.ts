import {Inject, Injectable} from '@angular/core';
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

        this.logger.debug('StaticComponentsRelationsNodesProvider: trying to get node {{@item}}', {item: {name: source.name, package: source.package}});

        const type = this.componentsRegister.getType(source.name);

        if(!type)
        {
            return null;
        }

        return {
            default: type
        };
    }
}