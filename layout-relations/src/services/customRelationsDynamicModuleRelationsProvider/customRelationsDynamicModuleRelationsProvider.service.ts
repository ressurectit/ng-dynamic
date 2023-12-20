import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';

import {CustomRelationsRegister} from '../customRelationsRegister/customRelationsRegister.service';

/**
 * Dynamic module relations types provider, for custom relations types
 */
@Injectable()
export class CustomRelationsDynamicModuleRelationsProvider implements DynamicModuleProvider
{
    //######################### constructor #########################
    constructor(@Inject(LOGGER) protected logger: Logger,
                @Optional() protected customRelationsRegister?: CustomRelationsRegister,)
    {
    }

    //######################### public methods - implementation of DynamicItemLoaderProvider #########################

    /**
     * @inheritdoc
     */
    public async tryToGet(source: DynamicItemSource): Promise<DynamicModule|null>
    {
        //only works with custom relations
        if(source.package != 'custom-relations')
        {
            return null;
        }

        this.logger.debug('CustomRelationsDynamicModuleRelationsProvider: trying to get relations types {{@item}}', {item: {name: source.name, package: source.package}});

        const types = await this.customRelationsRegister?.getRegisteredComponents();

        return {
            default: [
                ...types ?? [],
                'relationsInputs',
                'relationsOutputs',
            ]
        };
    }
}